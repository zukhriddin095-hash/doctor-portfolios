export const locales = ['uz', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'uz';
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const htmlLang: Record<Locale, string> = { uz: 'uz-Latn', ru: 'ru' };
export const dateLocale: Record<Locale, string> = { uz: 'uz-Latn-UZ', ru: 'ru-RU' };
