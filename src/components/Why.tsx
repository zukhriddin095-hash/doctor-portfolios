import Image from 'next/image';
import type { Dict } from '@/i18n/get-dictionary';
import { Reveal } from './motion';

export function Why({ t }: { t: Dict }) {
  return (
    <section id="why">
      <div className="w two">
        <Reveal>
          <h2>{t.wh}</h2>
          <ul className="wy"><li>{t.w1}</li><li>{t.w2}</li><li>{t.w3}</li><li>{t.w4}</li></ul>
          <a className="btn" href="https://www.youtube.com/watch?v=sCIGPz0YcnA" target="_blank" rel="noopener noreferrer">{t.vd}</a>
        </Reveal>
        <Reveal tag="figure" className="m0">
          <Image className="tm" src="/images/team.jpg" alt={t.wh} width={900} height={643} sizes="(max-width:900px) 100vw, 560px" />
        </Reveal>
      </div>
    </section>
  );
}
