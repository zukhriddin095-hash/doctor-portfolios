import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, locales } from '@/i18n/config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const saved = req.cookies.get('NEXT_LOCALE')?.value;
  const accept = req.headers.get('accept-language') ?? '';
  const locale = saved && isLocale(saved) ? saved : /(^|,)\s*ru/i.test(accept) ? 'ru' : defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}
export const config = { matcher: ['/((?!api|_next|images|favicon|sitemap|robots|.*\\..*).*)'] };
