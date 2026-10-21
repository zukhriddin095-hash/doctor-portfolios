'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from './I18nProvider';
import { Reveal } from './motion';

const ids = ['1', '2', '3', '4', '5'] as const;

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="faq" className="alt">
      <div className="w">
        <Reveal tag="h2">{t.fh}</Reveal>
        <Reveal className="fq">
          {ids.map((i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={isOpen ? 'o' : ''}>
                <button type="button" aria-expanded={isOpen} aria-controls={`a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  {(t as Record<string, string>)[`q${i}`]}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`a${i}`} className="fb" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
                      <p>{(t as Record<string, string>)[`a${i}`]}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
