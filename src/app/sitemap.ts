import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: `${base}/${l}`, lastModified: new Date(),
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}`])) },
  }));
}
