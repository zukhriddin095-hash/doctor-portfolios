import Image from 'next/image';
import { Activity, Plus, Search, Stethoscope } from 'lucide-react';
import type { Dict } from '@/i18n/get-dictionary';
import { Reveal, Stagger, Item } from './motion';

const steps = [['p1', Stethoscope], ['p2', Search], ['p3', Plus], ['p4', Activity]] as const;

export function Process({ t }: { t: Dict }) {
  return (
    <section id="process" className="alt">
      <div className="w" style={{ paddingTop: 0 }}>
        <Reveal tag="figure" className="band">
          <Image src="/images/foot.jpg" alt={t.ph2} width={1400} height={379} sizes="100vw" />
        </Reveal>
        <Reveal tag="h2">{t.ph2}</Reveal>
        <Reveal><p className="m">{t.pp}</p></Reveal>
        <Stagger inView className="st">
          {steps.map(([k, Icon], i) => (
            <Item key={k}>
              <b>{i + 1}</b>
              <Icon className="ic" aria-hidden />
              <h3>{t[k]}</h3>
              <p>{(t as Record<string, string>)[`${k}d`]}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
