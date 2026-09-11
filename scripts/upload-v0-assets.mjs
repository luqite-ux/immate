import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname } from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire('D:\\Cursor\\Grand\\huanqiu-admin\\package.json')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

for (const p of ['.env', '.env.local']) if (existsSync(p)) for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
  const i = line.indexOf('='); if (i < 1 || line.trim().startsWith('#')) continue
  process.env[line.slice(0, i).trim()] ??= line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
for (const key of ['R2_S3_ENDPOINT','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY']) if (!process.env[key]) throw new Error(`Missing ${key}`)
const base=(process.env.R2_PUBLIC_URL||process.env.R2_PUBLIC_URL_PREFIX)?.replace(/\/$/,''); if(!base) throw new Error('Missing R2 public URL')
const client=new S3Client({region:'auto',endpoint:process.env.R2_S3_ENDPOINT,requestChecksumCalculation:'WHEN_REQUIRED',responseChecksumValidation:'WHEN_REQUIRED',credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY}})
const bucket=process.env.R2_BUCKET_NAME||'sscewebsite'
const manifest=JSON.parse(readFileSync('D:/Cursor/Grand/immate/.codex-delivery/v0-asset-pack.json','utf8'))
const uploaded=[]
for(const [index,asset] of manifest.assets.entries()){
  const file=asset.source_path; const ext=extname(file).toLowerCase(); const key=`site-assets/immate/v0-input/${index+1}-${basename(file)}`
  await client.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:readFileSync(file),ContentType:ext==='.png'?'image/png':'image/jpeg',CacheControl:'public, max-age=31536000, immutable'}))
  uploaded.push({...asset,key,url:`${base}/${key}`})
}
writeFileSync('D:/Cursor/Grand/immate/.codex-delivery/v0-asset-urls.json',JSON.stringify({schema_version:1,uploaded_at:new Date().toISOString(),bucket,assets:uploaded},null,2)+'\n','utf8')
console.log(JSON.stringify({assetCount:uploaded.length}))
