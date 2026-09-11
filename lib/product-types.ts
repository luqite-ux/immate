export type ProductCategory = 'ai-translators' | 'video-call-cameras'
export type SpecGroup = { group: string; items: { label: string; value: string }[] }
export type Product = { slug:string;name:string;series:string;category:ProductCategory;categoryLabel:string;tagline:string;summary:string;image:string;imageAlt:string;highlights:string[];specs:SpecGroup[];applicationSlugs:string[] }
