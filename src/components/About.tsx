import Image from "next/image";
import type { Dict } from "@/i18n/get-dictionary";
import { Reveal } from "./motion";

export function About({ t }: { t: Dict }) {
  return (
    <section id="about">
      <div className="w ab">
        <Reveal tag="figure" className="m0">
          <Image
            className="pt"
            src="/images/doc_white1.png"
            alt={t.ah}
            width={700}
            height={959}
            sizes="(max-width:900px) 100vw, 480px"
          />
        </Reveal>
        <Reveal>
          <h2>{t.ah}</h2>
          <blockquote>{t.q0}</blockquote>
          <p>{t.ap1}</p>
          <p>{t.ap2}</p>
          <p>{t.ap3}</p>
          <ul className="fa">
            <li>
              <b>{t.f1}</b>
              <span>{t.f1v}</span>
            </li>
            <li>
              <b>{t.f2}</b>
              <span>NEO MED CARDIO</span>
            </li>
            <li>
              <b>{t.f3}</b>
              <span>{t.f3v}</span>
            </li>
          </ul>
        </Reveal>
      </div>
      <div className="w">
        <Reveal className="mv">
          <div>
            <h3>{t.ms}</h3>
            <p className="m">{t.msd}</p>
          </div>
          <div>
            <h3>{t.vs}</h3>
            <p className="m">{t.vsd}</p>
          </div>
        </Reveal>
        <Reveal>
          <h3 style={{ margin: "64px 0 8px" }}>{t.ach}</h3>
        </Reveal>
        <Reveal className="ach">
          <div>
            <span className="num">1000+</span>
            <p>{t.ac1}</p>
          </div>
          <div>
            <span className="num">1500+</span>
            <p>{t.ac2}</p>
          </div>
          <div>
            <span className="num">2000+</span>
            <p>{t.ac3}</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="m" style={{ fontSize: ".85rem" }}>
            {t.acn}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
