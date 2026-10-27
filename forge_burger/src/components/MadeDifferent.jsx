import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MadeDifferent.css';

const STATS = [
  {
    value: 7,
    title: 'Camadas de perfeição',
    label: 'Preparo',
    body: 'Cada ingrediente é preparado em sua própria estação e montado em menos de quarenta segundos, para que nada fique esperando.',
  },
  {
    value: 28,
    title: 'Dias de maturação a seco',
    label: 'Procedência',
    body: 'Cortes inteiros descansam em nossa câmara revestida de sal até o sabor se concentrar e a textura ficar macia.',
  },
  {
    value: 1,
    title: 'Um padrão sem concessões',
    label: 'Técnica',
    body: 'Uma receita aperfeiçoada ao longo de três anos. Sem atalhos nas noites movimentadas e sem substituições quando o estoque acaba.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function MadeDifferent() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = { trigger: '.made__grid', start: 'top 78%', once: true };

      gsap.from('.made__head > *', {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.made__head', start: 'top 80%', once: true },
      });

      gsap.from('.made__col', {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: trigger,
      });

      // Count the big numbers up from zero.
      gsap.utils.toArray('.made__num').forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: trigger,
          onUpdate: () => {
            el.textContent = pad(Math.round(counter.v));
          },
        });
      });

      gsap.from('.made__statement', {
        y: 50,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.made__statement', start: 'top 85%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="made" id="story" ref={rootRef}>
      <div className="container">
        <div className="made__head">
          <span className="eyebrow">Capítulo 03 — Nosso padrão</span>
          <h2 className="section-title">
            Feito de um jeito <em>diferente</em>
          </h2>
        </div>

        <div className="made__grid">
          {STATS.map((s) => (
            <article key={s.title} className="made__col">
              <span className="made__label">{s.label}</span>
              <span className="made__num" data-value={s.value}>
                {pad(s.value)}
              </span>
              <h3 className="made__title">{s.title}</h3>
              <p className="made__body">{s.body}</p>
            </article>
          ))}
        </div>

        <p className="made__statement">
          Não somos uma cozinha de fast-food nem uma churrascaria. A FORGE existe entre esses dois mundos:
          a precisão obsessiva da alta gastronomia, servida em algo que se come com as mãos.
          <span> — Cozinha FORGE</span>
        </p>
      </div>
    </section>
  );
}
