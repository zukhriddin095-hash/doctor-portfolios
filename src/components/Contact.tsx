import { Instagram, MapPin, Phone, Send, Youtube } from 'lucide-react';
import type { Dict } from '@/i18n/get-dictionary';
import { Reveal } from './motion';

export function Contact({ t }: { t: Dict }) {
  const q = 'NEO+MED+CARDIO+Arnasay+71+Tashkent';
  return (
    <section id="contact">
      <div className="w two">
        <Reveal><h2>{t.kh}</h2><p className="m">{t.kp}</p></Reveal>
        <Reveal tag="div" className="dl">
          <dl>
            <div><dt><MapPin className="ic" aria-hidden /><span>{t.k1}</span></dt><dd>{t.k1v}</dd></div>
            <div><dt><Phone className="ic" aria-hidden /><span>{t.k2}</span></dt><dd><a href="tel:+998971439315">+998 97 143 93 15</a></dd></div>
            <div><dt><Send className="ic" aria-hidden /><span>Telegram</span></dt><dd><a href="https://t.me/OrtopedT" target="_blank" rel="noopener noreferrer">@OrtopedT</a></dd></div>
            <div><dt><Instagram className="ic" aria-hidden /><span>Instagram</span></dt><dd><a href="https://www.instagram.com/reel/Cw9l345MVXQ/?igsh=MWc0cW92anZzNmgwZg%3D%3D" target="_blank" rel="noopener noreferrer">Instagram</a></dd></div>
            <div><dt><Youtube className="ic" aria-hidden /><span>YouTube</span></dt><dd><a href="https://www.youtube.com/watch?v=sCIGPz0YcnA" target="_blank" rel="noopener noreferrer">YouTube</a></dd></div>
          </dl>
        </Reveal>
      </div>
      <div className="w" style={{ marginTop: 56 }}>
        <Reveal tag="figure" className="map m0">
          <svg viewBox="0 0 800 360" role="img" aria-label={t.aMap}>
            <rect width="800" height="360" fill="var(--alt)" />
            <g fill="var(--line)" opacity=".6">
              {[[20, 20, 140, 56], [200, 20, 340, 56], [600, 20, 170, 56], [20, 110, 140, 120], [200, 110, 140, 120], [600, 110, 170, 120], [20, 270, 140, 70], [200, 270, 340, 70], [600, 270, 170, 70]].map(([x, y, w, h]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="6" />
              ))}
            </g>
            <g stroke="var(--bg)" fill="none" strokeLinecap="round">
              <path d="M0 92H800M0 252H800M180 0V360M580 0V360" strokeWidth="16" />
              <path id="rd" d="M0 330L800 60" strokeWidth="28" />
            </g>
            <text fontSize="13" fontWeight="600" fill="var(--mute)"><textPath href="#rd" startOffset="6%">{t.ro}</textPath></text>
            <g className="pw">
              <ellipse className="pu" cx="470" cy="172" rx="20" ry="8" fill="#C94F2B" />
              <path d="M470 174c-15-17-24-27-24-40a24 24 0 0 1 48 0c0 13-9 23-24 40z" fill="#C94F2B" />
              <circle cx="470" cy="134" r="9" fill="#fff" />
            </g>
          </svg>
          <div className="mc"><b>NEO MED CARDIO</b><span>{t.ma}</span></div>
          <figcaption className="m">{t.mcap}</figcaption>
          <div className="mb">
            <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">{t.gb}</a>
            <a className="btn g2" href={`https://yandex.com/maps/?text=${q.replaceAll('+', '%20')}`} target="_blank" rel="noopener noreferrer">{t.yb}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
