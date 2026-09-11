import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const TENANT_ID = '8b6f8303-1483-46b7-9950-def93298fa3c'
const domain = 'immateai.com'
const email = 'info@immateai.com'
const products = [
  {slug:'t10-max',name:'T10 MAX',series:'IM Mate',category:'ai-translators',categoryLabel:'AI Translators',tagline:'Flagship two-way AI translator for front-desk and trade teams',image:'/images/product-t10-max.jpg'},
  {slug:'t5-max',name:'T5 MAX',series:'IM Mate',category:'ai-translators',categoryLabel:'AI Translators',tagline:'Compact AI translator built for the road and the counter',image:'/images/product-t5-max.jpg'},
  {slug:'c30',name:'C30',series:'IM Cam',category:'video-call-cameras',categoryLabel:'Video Call Cameras',tagline:'Pan-tilt video call camera with an integrated status display',image:'/images/product-c30.jpg'},
  {slug:'c41p',name:'C41P',series:'IM Cam',category:'video-call-cameras',categoryLabel:'Video Call Cameras',tagline:'Video call camera with a wide-angle screen and built-in speaker',image:'/images/product-c41p.jpg'},
]
const categories=[['ai-translators','AI Translators'],['video-call-cameras','Video Call Cameras']]

const required=['NEXT_PUBLIC_SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY']
for(const key of required) if(!process.env[key]) throw new Error(`Missing ${key}`)
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)

async function main(){
  const passwordHash=await bcrypt.hash('info12345',12)
  const extra_settings={
    translation_profile:{industry:'AI communication devices',company_summary:'Shenzhen Cylan Technology Co., Ltd. develops IM Mate AI translators and IM Cam video call cameras.',main_products:['AI translators','video call cameras'],target_markets:['Global B2B buyers'],glossary:{'IM Mate':'IM Mate','IM Cam':'IM Cam'}},
    site_settings_source:'customer materials',site_settings_initialized_at:new Date().toISOString(),site_settings_manual_fields:[]
  }
  const tenant={id:TENANT_ID,domain,name:'immate',display_name:'深圳市赛蓝科技有限公司',email,password_hash:passwordHash,admin_group:2,brand_color:'#1267d6',logo_url:null,favicon_url:null,site_title_i18n:{en:'immate.ai — AI Translators & Video Call Cameras'},site_tagline_i18n:{en:'Communication hardware for real conversations'},site_description_i18n:{en:'IM Mate AI translators and IM Cam video call cameras from Shenzhen Cylan Technology Co., Ltd.'},default_language:'en',supported_languages:['en'],contact_email:email,contact_phone:'+86 139 2373 9540',contact_whatsapp:'+86 139 2373 9540',contact_address_short:'Shenzhen, Guangdong, China',contact_address_i18n:{en:'Rooms 211–212, Floor 2, Folk Culture Industrial Park, Qunli 2nd Road, Xingdong, Xin’an, Bao’an, Shenzhen, Guangdong, China'},social_links:{},seo_title_i18n:{en:'immate.ai | IM Mate AI Translators & IM Cam Video Call Cameras'},seo_description_i18n:{en:'Explore IM Mate AI translators and IM Cam video call cameras for international B2B applications.'},seo_keywords_i18n:{en:['AI translator','two-way translator','video call camera','IM Mate','IM Cam']},google_analytics_id:null,google_tag_manager_id:null,extra_settings}
  const {data:existingTenant,error:lookupError}=await db.from('tenants').select('id').eq('domain',domain).maybeSingle();if(lookupError)throw lookupError
  const tenantWrite=existingTenant
    ? await db.from('tenants').update(tenant).eq('id',existingTenant.id).select('id,domain,display_name,admin_group').single()
    : await db.from('tenants').insert(tenant).select('id,domain,display_name,admin_group').single()
  if(tenantWrite.error)throw tenantWrite.error
  const tenantId=tenantWrite.data.id
  const {data:conflict}=await db.from('admin_users').select('id,tenant_id').eq('email',email).maybeSingle();if(conflict&&conflict.tenant_id!==tenantId)throw new Error(`Admin email conflict: ${email}`)
  const adminPayload={tenant_id:tenantId,email,password_hash:passwordHash,is_active:true,must_change_password:false}
  const adminWrite=conflict?await db.from('admin_users').update(adminPayload).eq('id',conflict.id):await db.from('admin_users').insert(adminPayload);if(adminWrite.error)throw adminWrite.error
  for(const [slug,name] of categories){const payload={tenant_id:tenantId,slug,name,name_en:name,name_i18n:{en:name},description:`${name} from the ${slug==='ai-translators'?'IM Mate':'IM Cam'} product family.`,description_en:`${name} from the ${slug==='ai-translators'?'IM Mate':'IM Cam'} product family.`,description_i18n:{en:`${name} from the ${slug==='ai-translators'?'IM Mate':'IM Cam'} product family.`},sort_order:slug==='ai-translators'?1:2,is_active:true};const {data:existing}=await db.from('product_categories').select('id').eq('tenant_id',tenantId).eq('slug',slug).maybeSingle();const write=existing?await db.from('product_categories').update(payload).eq('id',existing.id):await db.from('product_categories').insert(payload);if(write.error)throw write.error}
  for(const [i,p] of products.entries()){const payload={tenant_id:tenantId,slug:p.slug,name:p.name,name_en:p.name,name_i18n:{en:p.name},model:p.name,category:p.categoryLabel,category_slug:p.category,image_url:p.image,description:p.tagline,description_en:p.tagline,description_i18n:{en:p.tagline},overview:p.tagline,overview_en:p.tagline,overview_i18n:{en:p.tagline},features:[],features_i18n:{en:[]},applications_i18n:{en:[]},advantages_i18n:{en:[]},specs:{series:p.series},extra_data:{series:p.series,images:[p.image]},sort_order:i+1,is_active:true};const {data:existing}=await db.from('products').select('id').eq('tenant_id',tenantId).eq('slug',p.slug).maybeSingle();const write=existing?await db.from('products').update(payload).eq('id',existing.id):await db.from('products').insert(payload);if(write.error)throw write.error}
  const [{data:tenantRead,error:tr},{data:productRead,error:pr},{data:categoryRead,error:cr},{data:userRead,error:ur}]=await Promise.all([db.from('tenants').select('id,domain,display_name,admin_group,contact_email,default_language,supported_languages,extra_settings').eq('id',tenantId).single(),db.from('products').select('slug,image_url').eq('tenant_id',tenantId).order('sort_order'),db.from('product_categories').select('slug').eq('tenant_id',tenantId).order('sort_order'),db.from('admin_users').select('email,must_change_password').eq('tenant_id',tenantId).single()]);for(const e of [tr,pr,cr,ur])if(e)throw e
  console.log(JSON.stringify({tenant:tenantRead,products:productRead,categories:categoryRead,admin:userRead},null,2))
}
main().catch(error=>{console.error(error.message);process.exit(1)})
