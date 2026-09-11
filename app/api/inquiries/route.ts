import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store, max-age=0' }
const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!secret) return Response.json({message:'Verification service is temporarily unavailable.'},{status:503,headers})
  let captcha
  try {
    const context = createSupabaseCaptchaContextFromEnv()
    captcha = await verifyCaptchaSubmission({secret,...context,scope:text(body?.captchaScope,160),token:text(body?.captchaToken,4096),answer:text(body?.captchaAnswer,16)})
  } catch { return Response.json({message:'Verification service is temporarily unavailable.'},{status:503,headers}) }
  if (!captcha.ok) return Response.json({message:'The verification code is incorrect or expired. Please try again.'},{status:400,headers})
  const tenantId=process.env.NEXT_PUBLIC_TENANT_ID?.trim()??''
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()??''
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()??''
  const inquiry={tenant_id:tenantId,name:text(body?.name,200),email:text(body?.email,320),phone:text(body?.phone,80)||null,company:text(body?.company,200)||null,subject:text(body?.subject,300)||null,message:text(body?.message,10000)}
  if(!tenantId||!url||!key||!inquiry.name||!inquiry.message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email))return Response.json({message:'Please complete all required inquiry fields.'},{status:400,headers})
  const {data,error}=await createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}).from('inquiries').insert(inquiry).select('id').single()
  if(error)return Response.json({message:'Submission failed. Please try again.'},{status:503,headers})
  return Response.json({message:'Inquiry submitted.',reference:data.id},{status:201,headers})
}
