import { readFileSync, writeFileSync } from 'node:fs'
import { basename, extname } from 'node:path'
import { createRequire } from 'node:module'
import { createClient } from '@supabase/supabase-js'
const require=createRequire('D:/Cursor/Grand/huanqiu-admin/package.json')
const {S3Client,PutObjectCommand}=require('@aws-sdk/client-s3')
const envFile='D:/Cursor/Grand/huanqiu-admin/.env'
for(const line of readFileSync(envFile,'utf8').split(/\r?\n/)){const t=line.trim();if(!t||t.startsWith('#'))continue;const i=t.indexOf('=');if(i<1)continue;process.env[t.slice(0,i).trim()]??=t.slice(i+1).trim().replace(/^['"]|['"]$/g,'')}
const tenantId='8b6f8303-1483-46b7-9950-def93298fa3c'
const manifest=JSON.parse(readFileSync('D:/Cursor/Grand/immate/.codex-delivery/full-content-manifest.json','utf8'))
const base=(process.env.R2_PUBLIC_URL_PREFIX||'').replace(/\/$/,'')
const bucket=process.env.R2_BUCKET_NAME
const s3=new S3Client({region:'auto',endpoint:process.env.R2_S3_ENDPOINT,requestChecksumCalculation:'WHEN_REQUIRED',responseChecksumValidation:'WHEN_REQUIRED',credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY}})
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)
const report=[]
for(const product of manifest.products){const gallery=[];for(const [index,file] of product.assets.entries()){const ext=extname(file).toLowerCase();const safe=basename(file).replace(/[^A-Za-z0-9._-]+/g,'-');const key=`products/${tenantId}/${product.key}/gallery/${String(index+1).padStart(2,'0')}-${safe}`;await s3.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:readFileSync(file),ContentType:ext==='.png'?'image/png':'image/jpeg',CacheControl:'public, max-age=31536000, immutable'}));gallery.push(`${base}/${key}`)}const {data:row,error:readError}=await db.from('products').select('id,extra_data').eq('tenant_id',tenantId).eq('slug',product.key).single();if(readError)throw readError;const {error}=await db.from('products').update({image_url:gallery[0],extra_data:{...(row.extra_data??{}),images:gallery,gallery,source_assets:product.assets}}).eq('id',row.id);if(error)throw error;report.push({key:product.key,source_count:product.assets.length,cover:gallery[0],gallery})}
writeFileSync('D:/Cursor/Grand/immate/.codex-delivery/product-media-mapping.json',JSON.stringify({schema_version:1,tenant_id:tenantId,uploaded_at:new Date().toISOString(),products:report,unassigned:[],duplicate_covers:[]},null,2)+'\n','utf8')
console.log(JSON.stringify({products:report.map(x=>({key:x.key,count:x.gallery.length,cover:x.cover})),total:report.reduce((n,x)=>n+x.gallery.length,0)},null,2))
