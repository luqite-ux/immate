"use client"

import { useState, type FormEvent } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

type Option = { slug: string; label: string }

export function InquiryForm({ presetProductSlug, products }: { presetProductSlug?: string; products: Option[] }) {
  const [status,setStatus]=useState<{ok:boolean;message:string}|null>(null)
  const [submitting,setSubmitting]=useState(false)
  const [refreshKey,setRefreshKey]=useState(0)

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    setSubmitting(true)
    setStatus(null)
    const form=event.currentTarget
    const fd=new FormData(form)
    const product=String(fd.get('product')??'')
    const body={name:fd.get('name'),company:fd.get('company'),email:fd.get('email'),phone:fd.get('phone'),subject:product?`Product inquiry: ${product}`:'General inquiry',message:`Country / region: ${String(fd.get('country')??'')}\nProduct: ${product||'General'}\n\n${String(fd.get('message')??'')}`,captchaScope:fd.get('captchaScope'),captchaToken:fd.get('captchaToken'),captchaAnswer:fd.get('captchaAnswer')}
    try{
      const response=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      const result=await response.json().catch(()=>({message:'Submission failed.'}))
      if(!response.ok)throw new Error(result.message)
      setStatus({ok:true,message:'Your inquiry has been submitted successfully.'})
      form.reset()
    }catch(error){
      setStatus({ok:false,message:error instanceof Error?error.message:'Submission failed. Please try again.'})
    }finally{
      setSubmitting(false)
      setRefreshKey(v=>v+1)
    }
  }

  const input='mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
  return <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
    <div className="grid gap-6 sm:grid-cols-2">
      <label className="text-sm font-medium">Full name *<input className={input} name="name" required autoComplete="name"/></label>
      <label className="text-sm font-medium">Company<input className={input} name="company" autoComplete="organization"/></label>
      <label className="text-sm font-medium">Business email *<input className={input} name="email" type="email" required autoComplete="email"/></label>
      <label className="text-sm font-medium">Phone<input className={input} name="phone" autoComplete="tel"/></label>
      <label className="text-sm font-medium">Country / region<input className={input} name="country" autoComplete="country-name"/></label>
      <label className="text-sm font-medium">Product of interest<select className={input} name="product" defaultValue={presetProductSlug??''}><option value="">General inquiry</option>{products.map(p=><option key={p.slug} value={p.label}>{p.label}</option>)}</select></label>
    </div>
    <label className="mt-6 block text-sm font-medium">Message *<textarea className={`${input} h-auto min-h-32 py-3`} name="message" required placeholder="Tell us about your target market, order volume, and timeline."/></label>
    <InquiryCaptchaField refreshKey={refreshKey} className="mt-6 rounded-lg border bg-slate-50 p-4"/>
    {status&&<p role={status.ok?'status':'alert'} className={`mt-5 rounded-lg p-3 text-sm ${status.ok?'bg-emerald-50 text-emerald-800':'bg-red-50 text-red-800'}`}>{status.message}</p>}
    <button type="submit" disabled={submitting} className="mt-6 h-12 rounded-lg bg-blue-700 px-6 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{submitting?'Submitting…':'Submit inquiry'}</button>
  </form>
}

