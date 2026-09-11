import { createClient } from '@supabase/supabase-js'

export function getSupabaseConfig(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const anonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;const tenantId=process.env.NEXT_PUBLIC_TENANT_ID;if(!url||!anonKey||!tenantId)throw new Error('Supabase customer-site configuration is incomplete');return{url,anonKey,tenantId}}
export function getSupabaseClient(){const c=getSupabaseConfig();return createClient(c.url,c.anonKey,{auth:{persistSession:false}})}
