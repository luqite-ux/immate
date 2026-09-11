import { PageHero } from '@/components/page-hero'
import { InquiryForm } from '@/components/inquiry-form'
import { fetchProductsData } from '@/lib/products-db'
export const metadata={title:'Contact',description:'Contact Shenzhen Cylan Technology Co., Ltd. about IM Mate and IM Cam products.',alternates:{canonical:'https://immateai.com/contact'}}

export const revalidate = 60

export default async function Contact(){const products=await fetchProductsData();return <><PageHero eyebrow="Contact" title="Tell us what your market needs" description="Share your product, quantity and timeline. Our team will respond with relevant technical and commercial information."/><section className="mx-auto max-w-3xl px-6 py-16"><InquiryForm products={products.map(p=>({slug:p.slug,label:`${p.series} ${p.name}`}))}/></section></>}
