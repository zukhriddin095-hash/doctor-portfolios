import Image from 'next/image';
import { Activity, Bone, Microscope, Plus, Search, Stethoscope } from 'lucide-react';
import type { Dict } from '@/i18n/get-dictionary';
import { Reveal } from './motion';

const rows = [
  { k: 's1', img: 'hernia_endo', w: 640, h: 825, Icon: Microscope },
  { k: 's2', img: 'knee_implant', w: 640, h: 825, Icon: Bone },
  { k: 's3', img: 'spine', w: 800, h: 386, Icon: Activity },
  { k: 's4', img: 'knee_meniscus', w: 640, h: 825, Icon: Bone },
] as const;
const extras = [
  { k: 'e1', Icon: Search }, { k: 'e2', Icon: Stethoscope }, { k: 'e3', Icon: Plus }, { k: 'e4', Icon: Bone },
] as const;

export function Services({ t }: { t: Dict }) {
  return (
    <section id="services" className="alt">
      <div className="w">
        <Reveal tag="h2">{t.sh}</Reveal>
        <Reveal><p className="m">{t.sp}</p></Reveal>
        <div className="sv">
          {rows.map(({ k, img, w, h, Icon }) => (
            <Reveal key={k} className="sr">
              <div className="pl">
                <Image src={`/images/${img}.jpg`} alt={t[k]} width={w} height={h} sizes="(max-width:900px) 100vw, 260px" />
                <Icon className="ic" aria-hidden />
              </div>
              <h3>{t[k]}</h3>
              <p className="m">{(t as Record<string, string>)[`${k}d`]}</p>
            </Reveal>
          ))}
        </div>
        <div className="ex">
          {extras.map(({ k, Icon }, i) => (
            <Reveal key={k} delay={i * 0.06}>
              <Icon className="ic" aria-hidden />
              <h3>{t[k]}</h3>
              <p className="m">{(t as Record<string, string>)[`${k}d`]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
