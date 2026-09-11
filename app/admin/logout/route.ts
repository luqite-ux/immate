import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
export async function GET(request:Request){const response=NextResponse.redirect(new URL('/admin/login',request.url));response.cookies.delete(SESSION_COOKIE);response.cookies.delete('hq_tenant_id');return response}

