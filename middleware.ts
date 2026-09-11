import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
export function middleware(request:NextRequest){const p=request.nextUrl.pathname;const publicPath=p.startsWith('/admin/login')||p.startsWith('/admin/logout');if(!publicPath&&p.startsWith('/admin')&&!request.cookies.get(SESSION_COOKIE)?.value){const url=request.nextUrl.clone();url.pathname='/admin/login';url.searchParams.set('reason','unauthorized');return NextResponse.redirect(url)}return NextResponse.next()}
export const config={matcher:['/admin/:path*']}

