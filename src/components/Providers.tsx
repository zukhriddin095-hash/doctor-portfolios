'use client';
import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { I18nProvider } from './I18nProvider';
import { ScrollProgress } from './motion';
import type { Dict } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export function Providers({ t, locale, children }: { t: Dict; locale: Locale; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider t={t} locale={locale}>
        <ScrollProgress />
        {children}
      </I18nProvider>
    </MotionConfig>
  );
}
