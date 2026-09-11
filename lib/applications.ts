export type Application = {
  slug: string
  title: string
  icon: "handshake" | "concierge-bell" | "headset" | "briefcase" | "heart-handshake" | "store" | "presentation" | "shield-check"
  summary: string
  scenarios: string[]
  recommendedSlugs: string[]
}

export const applications: Application[] = [
  {
    slug: "trade-shows",
    title: "Trade Shows & Exhibitions",
    icon: "presentation",
    summary:
      "Staff a booth with a translator that lets visiting buyers speak in their own language while your team responds in real time.",
    scenarios: [
      "Booth conversations with international visitors",
      "Live product demonstrations for overseas buyers",
      "Quick language switching between back-to-back meetings",
    ],
    recommendedSlugs: ["t10-max", "t5-max"],
  },
  {
    slug: "reception-desks",
    title: "Hospitality & Front-Desk Reception",
    icon: "concierge-bell",
    summary:
      "Give front-desk teams a counter-ready translator and a camera-equipped display for check-in, concierge, and visitor support.",
    scenarios: [
      "Hotel and serviced-apartment check-in counters",
      "Corporate lobby and visitor reception",
      "Multilingual concierge support",
    ],
    recommendedSlugs: ["t10-max", "c30", "c41p"],
  },
  {
    slug: "cross-border-service",
    title: "Cross-Border Customer Service",
    icon: "headset",
    summary:
      "Support customer service teams handling calls and chats across regions with fast, on-device two-way translation.",
    scenarios: [
      "Multilingual customer support desks",
      "After-sales support for export businesses",
      "Distributor and agent communication",
    ],
    recommendedSlugs: ["t5-max", "t10-max"],
  },
  {
    slug: "business-meetings",
    title: "Import/Export Business Meetings",
    icon: "briefcase",
    summary:
      "Keep negotiations moving with a translator on the table that both sides can read, speak to, and trust for accuracy.",
    scenarios: [
      "Supplier and buyer negotiation sessions",
      "Factory audits with visiting international clients",
      "Contract and terms discussions",
    ],
    recommendedSlugs: ["t10-max", "t5-max"],
  },
  {
    slug: "family-care",
    title: "Family & Elderly Care Monitoring",
    icon: "heart-handshake",
    summary:
      "Stay connected with family members through a camera that pairs a clear video call with a simple, glanceable screen.",
    scenarios: [
      "Checking in on elderly family members remotely",
      "Two-way video calls between households",
      "Simple call controls for less tech-familiar users",
    ],
    recommendedSlugs: ["c30", "c41p"],
  },
  {
    slug: "retail-monitoring",
    title: "Smart Retail & Store Monitoring",
    icon: "store",
    summary:
      "Keep an eye on a storefront or counter area with a pan-tilt camera and video calling for remote staff coordination.",
    scenarios: [
      "Storefront and counter-area monitoring",
      "Remote check-ins between store locations",
      "Staff coordination through video calling",
    ],
    recommendedSlugs: ["c30", "c41p"],
  },
]

export function getApplicationBySlug(slug: string) {
  return applications.find((application) => application.slug === slug)
}
