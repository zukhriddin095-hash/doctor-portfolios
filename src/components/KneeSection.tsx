import type { Dict } from '@/i18n/get-dictionary';
import { Reveal } from './motion';
import KneeLoader from './KneeLoader';

export function KneeSection({ t }: { t: Dict }) {
  return (
    <section id="model" className="alt">
      <div className="w two">
        <Reveal><h2>{t.mh}</h2><p className="m">{t.mp}</p></Reveal>
        <Reveal><KneeLoader /></Reveal>
      </div>
    </section>
  );
}
