import Image from 'next/image';
import { Activity, Search, Stethoscope } from 'lucide-react';
import type { Dict } from '@/i18n/get-dictionary';
import { ClipFigure, Item, Stagger } from './motion';

export function Hero({ t }: { t: Dict }) {
  return (
    <div className="hero">
      <div className="w">
        <Stagger>
          <Item tag="h1">{t.h1}</Item>
          <Item tag="p">{t.hp}</Item>
          <Item className="cta">
            <a className="btn" href="#appointment">{t.c1}</a>
            <a className="btn g" href="#services">{t.c2}</a>
          </Item>
          <Item><a className="tel" href="tel:+998971439315">+998 97 143 93 15</a></Item>
          <Item tag="ul" className="ch">
            <li><Search className="ic" aria-hidden />{t.e1}</li>
            <li><Stethoscope className="ic" aria-hidden />{t.e2}</li>
            <li><Activity className="ic" aria-hidden />{t.p4}</li>
          </Item>
        </Stagger>
        <ClipFigure className="dp">
          <Image src="/images/doc_blue.jpg" alt={t.ah} width={700} height={781} priority sizes="(max-width:900px) 100vw, 520px" />
          <figcaption><b>{t.f1v}</b><span>NEO MED CARDIO</span></figcaption>
        </ClipFigure>
      </div>
      <div className="w"><div className="sc"><i /><span>{t.sc}</span></div></div>
    </div>
  );
}
