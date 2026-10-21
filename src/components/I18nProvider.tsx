'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { Dict } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

const Ctx = createContext<{ t: Dict; locale: Locale } | null>(null);
export function I18nProvider({ t, locale, children }: { t: Dict; locale: Locale; children: ReactNode }) {
  return <Ctx.Provider value={{ t, locale }}>{children}</Ctx.Provider>;
}
export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>');
  return v;
}
