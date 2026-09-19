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
    const productLabel=products.find(p=>p.slug===product)?.label??'General inquiry'
    const inquiryType=String(fd.get('inquiryType')??'General inquiry')
    const quantity=String(fd.get('quantity')??'').trim()||'Not specified'
    const targetDate=String(fd.get('targetDate')??'').trim()||'Not specified'
    const body={name:fd.get('name'),company:fd.get('company'),email:fd.get('email'),phone:fd.get('phone'),subject:product?`Product inquiry: ${productLabel}`:inquiryType,message:`Country / region: ${String(fd.get('country')??'')}\nProduct: ${productLabel}\nInquiry type: ${inquiryType}\nEstimated quantity: ${quantity}\nTarget date: ${targetDate}\n\n${String(fd.get('message')??'')}`,captchaScope:fd.get('captchaScope'),captchaToken:fd.get('captchaToken'),captchaAnswer:fd.get('captchaAnswer')}
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

  const validPreset=products.some(p=>p.slug===presetProductSlug)?presetProductSlug:''
  const presetProduct=products.find(p=>p.slug===validPreset)
  const input='mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
  return <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
    {presetProduct&&<div className="mb-6 rounded-lg border border-cyan-200 bg-cyan-50 p-4"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">Your product inquiry</p><p className="mt-1 text-lg font-bold text-slate-950">{presetProduct.label}</p></div>}
    <div className="grid gap-6 sm:grid-cols-2">
      <label className="text-sm font-medium">Full name *<input className={input} name="name" required autoComplete="name"/></label>
      <label className="text-sm font-medium">Company<input className={input} name="company" autoComplete="organization"/></label>
      <label className="text-sm font-medium">Business email *<input className={input} name="email" type="email" required autoComplete="email"/></label>
      <label className="text-sm font-medium">Phone<input className={input} name="phone" autoComplete="tel"/></label>
      <label className="text-sm font-medium">Country / region<input className={input} name="country" autoComplete="country-name"/></label>
      <label className="text-sm font-medium">Product of interest<select className={input} name="product" defaultValue={validPreset}><option value="">General inquiry</option>{products.map(p=><option key={p.slug} value={p.slug}>{p.label}</option>)}</select></label>
      <label className="text-sm font-medium">Inquiry type<select className={input} name="inquiryType" defaultValue="Sample request"><option>Sample request</option><option>Bulk order</option><option>OEM / ODM</option><option>SDK integration</option><option>General inquiry</option></select></label>
      <label className="text-sm font-medium">Estimated quantity<input className={input} name="quantity" inputMode="numeric" placeholder="e.g. 100 pieces"/></label>
      <label className="text-sm font-medium">Target date<input className={input} name="targetDate" type="date"/></label>
    </div>
    <label className="mt-6 block text-sm font-medium">Message *<textarea className={`${input} h-auto min-h-32 py-3`} name="message" required placeholder="Tell us about your target market, order volume, and timeline."/></label>
    <InquiryCaptchaField refreshKey={refreshKey} className="mt-6 rounded-lg border bg-slate-50 p-4"/>
    {status&&<p role={status.ok?'status':'alert'} className={`mt-5 rounded-lg p-3 text-sm ${status.ok?'bg-emerald-50 text-emerald-800':'bg-red-50 text-red-800'}`}>{status.message}</p>}
    <button type="submit" disabled={submitting} className="mt-6 h-12 rounded-lg bg-blue-700 px-6 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{submitting?'Submitting…':'Submit inquiry'}</button>
  </form>
}

