'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from './I18nProvider';
import { locales, type Locale } from '@/i18n/config';

const links = [['#top', 'n1'], ['#about', 'n2'], ['#services', 'n3'], ['#reviews', 'n4'], ['#faq', 'n5'], ['#contact', 'n6']] as const;

function LanguageSwitcher() {
  const { locale } = useI18n();
  const router = useRouter();
  const go = (l: Locale) => {
    if (l === locale) return;
    document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
    router.replace(`/${l}${window.location.hash}`, { scroll: false });
  };
  return (
    <div className="sw" role="group" aria-label="Til / Язык">
      {locales.map((l) => (
        <button key={l} type="button" lang={l} aria-pressed={l === locale} onClick={() => go(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { t } = useI18n();
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };
  return <button type="button" className="ib" onClick={toggle} aria-label={t.aTh}>◐</button>;
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'services', 'reviews', 'faq', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', esc);
    return () => { io.disconnect(); removeEventListener('keydown', esc); };
  }, []);
  return (
    <header>
      <div className="w bar">
        <a className="br" href="#top" aria-label="Shohrux Suvanov — travmatolog va ortoped">
          <svg className="lg" viewBox="0 0 40 40" width="42" height="42" aria-hidden="true">
            <rect width="40" height="40" rx="9" fill="#C94F2B" />
            <path d="M13 8l6 12M21 20l7 12" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="4.5" fill="#0B2E33" stroke="#fff" strokeWidth="2.5" />
            <circle cx="29" cy="10" r="2" fill="#F2B24A" />
          </svg>
          <span className="lt"><b>Suvanov</b><small>{t.lg}</small></span>
        </a>
        <nav id="nav" className={open ? 'open' : ''} aria-label={t.aNav} onClick={(e) => (e.target as HTMLElement).tagName === 'A' && setOpen(false)}>
          <ul>
            {links.map(([href, k]) => (
              <li key={k}><a href={href} className={active === href.slice(1) ? 'on' : ''}>{t[k]}</a></li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
        <button type="button" className="ib bg" aria-expanded={open} aria-controls="nav" aria-label={t.aMenu} onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </header>
  );
}
