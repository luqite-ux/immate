import {PageHero} from '@/components/page-hero'
export const metadata={title:'FAQ',description:'B2B buyer questions about IM Mate and IM Cam models, samples, MOQ and customization.',alternates:{canonical:'https://immateai.com/faq'}}
const groups=[
  {title:'Products & specifications',items:[
    ['What models are available?','T10 MAX and T5 MAX AI translators, plus C30 and the C41-series video call camera supplied in the product materials.'],
    ['Can size, material, color or process be customized?','Yes. Available customization is confirmed against the selected model and order requirements.'],
    ['Can you provide samples?','Yes. Samples are available and are charged.'],
    ['Can you provide technical data sheets or inspection information?','Yes. Relevant technical data sheets and inspection information can be discussed for the selected product.'],
    ['What applications are the products designed for?','AI translators suit hotel front desks, meeting rooms, tourism, hospitals, retail shops, banks and airports. Video call cameras are designed for indoor communication with children, older family members and pets.'],
    ['Do you support OEM and ODM?','Yes. OEM and ODM cooperation is supported.'],
  ]},
  {title:'MOQ & commercial terms',items:[
    ['What is the standard MOQ?','The supplied commercial guideline is 100 pieces.'],
    ['Do you offer tiered pricing?','Yes. Tiered pricing can be discussed according to model and quantity.'],
    ['Does the quotation include packaging, shipping or taxes?','The supplied guideline includes packaging. Shipping and taxes are confirmed in the quotation.'],
    ['Do you offer long-term cooperation pricing or bulk discounts?','Yes. Long-term cooperation pricing and bulk discounts can be discussed.'],
    ['Can pricing change with raw-material costs or exchange rates?','Yes. Final pricing may change with raw-material costs or exchange rates and is confirmed in the current quotation.'],
  ]},
  {title:'Samples',items:[
    ['Can samples be shipped?','Yes. Sample shipment can be arranged.'],
    ['Are samples charged and refundable?','Samples are charged. Refund terms are confirmed with the order.'],
    ['What is the sample lead time?','The supplied guideline is approximately one to two days.'],
    ['Can a customized sample be approved before mass production?','Yes. Sample approval can be arranged before mass production.'],
    ['Are samples consistent with mass production?','The approved sample is used as the production reference. Final requirements are confirmed before production.'],
  ]},
  {title:'Production & delivery',items:[
    ['What is the production lead time after ordering?','The supplied guideline is seven to fifteen days after order confirmation.'],
    ['Is bulk-order delivery stable?','The team plans production against the confirmed order schedule and communicates any change.'],
    ['Can peak season extend lead time?','Yes. Peak-season capacity can affect lead time, so the current schedule is confirmed before ordering.'],
    ['Do you support expedited production?','Yes. Expedited production can be discussed against current capacity.'],
    ['Can you provide production progress updates?','Yes. Progress updates can be provided during production.'],
  ]},
  {title:'Quality & inspection',items:[
    ['Do you have a quality-control process?','Yes. Quality checks are included in the production process.'],
    ['Do you support third-party inspection?','Yes. Third-party inspection can be arranged.'],
    ['Can you provide inspection or outgoing-quality reports?','Yes. Applicable inspection information can be provided for the order.'],
    ['How are quality issues handled?','The team reviews the specific issue and confirms an appropriate corrective production or replacement plan for the order.'],
  ]},
]
export default function FAQ(){return <><PageHero eyebrow="FAQ" title="Practical answers for B2B buyers" description="Product, sampling and cooperation basics from information supplied by our team."/><section className="mx-auto max-w-5xl space-y-12 px-6 py-16">{groups.map(group=><div key={group.title}><h2 className="text-2xl font-bold">{group.title}</h2><div className="mt-5 grid gap-4">{group.items.map(([q,a])=><article key={q} className="rounded-xl border p-6"><h3 className="text-lg font-bold">{q}</h3><p className="mt-2 text-slate-600">{a}</p></article>)}</div></div>)}</section></>}
