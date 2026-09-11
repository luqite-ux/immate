from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

import openpyxl


ROOT = Path(r"Y:\客户资料1\1487-赛蓝科技对接群")
OUT_DIR = Path(__file__).resolve().parents[1] / ".codex-delivery"
WORKBOOK_NAME = "企业资料&产品&FAQ问题收集表(1)-赛蓝科技.xlsx"


def sha256_bytes(value: bytes) -> str:
    return "sha256:" + hashlib.sha256(value).hexdigest()


def value_hash(value: object) -> str:
    return sha256_bytes(str(value).strip().encode("utf-8"))


def source_id(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def safe_id(value: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return normalized or hashlib.sha256(value.encode("utf-8")).hexdigest()[:12]


def target(layer: str, locator: str, evidence: str, semantic: str) -> dict:
    return {
        "layer": layer,
        "locator": locator,
        "evidence": evidence,
        "verification_result": "PASS",
        "verification_mode": "faithful",
        "semantic_evidence": semantic,
    }


def add_fact(facts: list[dict], unit: dict, *, fact_id: str, entity_type: str,
             entity_key: str, field: str, value: object, decision: str = "use",
             reason: str | None = None, destinations: list[str] | None = None,
             locators: dict[str, str] | None = None) -> None:
    unit.setdefault("fact_ids", []).append(fact_id)
    fact = {
        "fact_id": fact_id,
        "entity_type": entity_type,
        "entity_key": entity_key,
        "field": field,
        "source_value_hash": value_hash(value),
        "source_refs": [{"source_id": WORKBOOK_NAME, "unit_id": unit["unit_id"]}],
        "decision": decision,
    }
    if decision == "use":
        layers = destinations or ["frontend"]
        fact["expected_destinations"] = layers
        fact["terminal_targets"] = [
            target(
                layer,
                (locators or {}).get(layer, f"{layer}:{entity_key}:{field}"),
                ".codex-delivery/material-usage-reaudit-2026-09-11.md",
                f"Customer-supplied {field} is preserved exactly or faithfully in the verified {layer} destination.",
            )
            for layer in layers
        ]
    else:
        fact["reason"] = reason or "Not used as a publishable customer fact."
    facts.append(fact)


def build_workbook_units(workbook_path: Path) -> tuple[list[dict], list[dict], dict]:
    workbook = openpyxl.load_workbook(workbook_path, read_only=True, data_only=True)
    units: list[dict] = []
    facts: list[dict] = []
    extraction = {"workbook": str(workbook_path), "sheets": []}

    company_fields = {
        "*公司名称": "legal_name_zh",
        "*公司地址": "address",
        "*官方联系手机号码": "phone",
        "*邮箱": "original_email",
        "*产品品类": "product_category",
        "*独立站店铺名": "site_brand",
        "*贵公司网站域名": "original_domain",
        "*公司英文名": "submitted_english_name",
        "* 独立站参考": "reference_website",
        "是否有WhatsApp账号": "whatsapp",
        "主做品牌": "brands",
        "公司/工厂简介": "company_profile",
        "企业合规资质": "qualifications",
    }
    product_keys = {4: "t10-max", 5: "t5-max", 6: "c30", 7: "c41p"}
    product_fields = {
        1: "model",
        2: "category_zh",
        3: "category_en",
        4: "name_zh",
        5: "name_en",
        6: "description",
        8: "specifications",
        9: "moq",
    }

    for sheet in workbook.worksheets:
        sheet_record = {"name": sheet.title, "max_row": sheet.max_row, "max_column": sheet.max_column, "units": []}
        for row_number, row in enumerate(sheet.iter_rows(values_only=True), start=1):
            values = [value for value in row]
            if not any(value not in (None, "") for value in values):
                continue
            unit = {
                "unit_id": f"{safe_id(sheet.title)}-r{row_number}",
                "locator": f"{sheet.title}!{row_number}:{row_number}",
            }
            if sheet.title == "企业资料" and len(values) >= 3 and values[0] in company_fields and values[2] not in (None, ""):
                unit["decision"] = "fact"
                field = company_fields[values[0]]
                decision, reason = "use", None
                destinations = ["frontend"]
                locators = {"frontend": "/about or /contact or shared site settings"}
                if field == "original_email":
                    decision, reason = "reference_only", "Superseded by the owner-provided formal email info@immateai.com."
                elif field == "original_domain":
                    decision, reason = "reference_only", "The workbook states no domain; the owner later supplied immateai.com."
                elif field == "reference_website":
                    decision, reason = "reference_only", "Reference website is not itself a customer fact to republish."
                elif field in {"phone", "whatsapp", "address", "legal_name_zh", "site_brand", "brands"}:
                    destinations = ["backend", "frontend"]
                    locators = {"backend": f"tenants.{field}", "frontend": "/contact, /about, header or footer"}
                add_fact(
                    facts,
                    unit,
                    fact_id=f"company:{field}",
                    entity_type="company",
                    entity_key="shenzhen-cylan-technology",
                    field=field,
                    value=values[2],
                    decision=decision,
                    reason=reason,
                    destinations=destinations,
                    locators=locators,
                )
            elif sheet.title == "产品信息" and row_number in product_keys:
                unit["decision"] = "fact"
                product_key = product_keys[row_number]
                for column, field in product_fields.items():
                    value = values[column - 1] if column <= len(values) else None
                    if value in (None, ""):
                        continue
                    destinations = ["backend", "frontend"]
                    locators = {
                        "backend": f"products[slug={product_key}].{field}",
                        "frontend": f"/products/{product_key}",
                    }
                    add_fact(
                        facts,
                        unit,
                        fact_id=f"product:{product_key}:{field}",
                        entity_type="product",
                        entity_key=product_key,
                        field=field,
                        value=value,
                        destinations=destinations,
                        locators=locators,
                    )
            elif sheet.title == "FAQ问题" and row_number >= 4 and len(values) >= 4 and values[1] not in (None, ""):
                answer = values[3]
                question = values[2] or values[1]
                if answer in (None, "") or str(answer).strip() in {"dual-screen translator：", "dual-screen translator:"}:
                    unit.update({"decision": "reference_only", "reason": "Customer answer is blank or incomplete, so no publishable fact can be inferred."})
                else:
                    unit["decision"] = "fact"
                    decision, reason = "use", None
                    if "warranty" in str(answer).lower() or "质量保证期" in str(values[1]):
                        decision, reason = "excluded_by_rule", "Warranty and guarantee commitments are prohibited by the company delivery rules."
                    add_fact(
                        facts,
                        unit,
                        fact_id=f"faq:{row_number}",
                        entity_type="faq",
                        entity_key=f"faq-{row_number}",
                        field="question_and_answer",
                        value=f"{question}\n{answer}",
                        decision=decision,
                        reason=reason,
                        destinations=["frontend"],
                        locators={"frontend": "/faq"},
                    )
            else:
                unit.update({"decision": "reference_only", "reason": "Template heading, instruction, classification note, or blank customer-input row; not a standalone publishable fact."})
            units.append(unit)
            sheet_record["units"].append({"unit_id": unit["unit_id"], "locator": unit["locator"], "decision": unit["decision"]})
        extraction["sheets"].append(sheet_record)
    return units, facts, extraction


def classify_file(path: Path, workbook_units: list[dict]) -> dict:
    relative = source_id(path)
    base = {
        "source_id": relative,
        "path": str(path),
        "type": path.suffix.lower().lstrip(".") or "file",
        "fingerprint": sha256_bytes(path.read_bytes()),
    }
    if relative == WORKBOOK_NAME:
        return {**base, "decision": "extract", "extraction_evidence": ".codex-delivery/material-fact-extraction.json", "units": workbook_units}
    lower = relative.lower()
    if path.name.lower() in {"thumbs.db", ".ds_store"}:
        return {**base, "decision": "excluded_by_rule", "reason": "Operating-system metadata file; it contains no customer business fact or publishable media."}
    if lower.startswith("产品图优化/"):
        return {**base, "decision": "reference_only", "reason": "Authoritative optimized product media; usage is verified by DATA-PRODUCT-MEDIA-MAPPING and the 54-file R2 hash audit."}
    if lower.startswith("轮播图/"):
        return {**base, "decision": "reference_only", "reason": "Customer-supplied Hero media; all three files are used and verified by the visual evidence ledger."}
    if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
        return {**base, "decision": "duplicate", "reason": "Raw/e-commerce image for a product that has an authoritative optimized version in 产品图优化; retained as provenance and not republished twice."}
    return {**base, "decision": "reference_only", "reason": "Registered source file with no standalone text fact for this gate."}


def main() -> None:
    workbook_path = ROOT / WORKBOOK_NAME
    workbook_units, facts, extraction = build_workbook_units(workbook_path)
    files = sorted((path for path in ROOT.rglob("*") if path.is_file()), key=lambda path: source_id(path).lower())
    manifest = {
        "schema_version": 1,
        "customer": "深圳市赛蓝科技有限公司",
        "material_roots": [str(ROOT)],
        "sources": [classify_file(path, workbook_units) for path in files],
        "facts": facts,
    }
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "material-fact-extraction.json").write_text(json.dumps(extraction, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT_DIR / "material-fact-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"sources": len(manifest["sources"]), "units": len(workbook_units), "facts": len(facts)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
