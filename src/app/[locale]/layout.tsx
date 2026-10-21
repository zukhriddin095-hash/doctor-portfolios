import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import { htmlLang, isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair', display: 'swap', weight: ['600', '700', '800'] });
type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0B2E33' };
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: t.mt,
    description: t.md,
    alternates: { canonical: `/${locale}`, languages: { uz: '/uz', ru: '/ru' } },
    openGraph: { title: t.mt, description: t.md, url: `/${locale}`, type: 'website', locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU', images: ['/images/doc_blue.jpg'] },
  };
}

const themeScript = "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}";

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={htmlLang[locale]} className={`${manrope.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
