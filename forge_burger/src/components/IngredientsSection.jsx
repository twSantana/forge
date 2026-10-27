import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './IngredientsSection.css';

const INGREDIENTS = [
  {
    no: '01',
    name: 'Hamburguer de Carne bovina',
    line: 'Carne selecionada.',
    body: 'Marbling score 8+, ground twice a day in-house from chuck and short rib for a 75/25 blend.',
    origin: 'Kagoshima, JP',
    swatch: 'beef',
  },
  {
    no: '02',
    name: 'Pão de Brioche ',
    line: 'Feito na casa todos os dias. Nunca congelado.',
    body: 'Manteiga fermentada e gemas caipiras, com massa descansada durante a noite e assada ao amanhecer em pequenos lotes.',
    origin: 'Nossa padaria, às 5h.',
    swatch: 'bun',
  },
  {
    no: '03',
    name: 'Molho Cheddar',
    line: 'Curado por 12 meses em câmara.',
    body: 'Um cheddar intenso e cristalino, com gordura na medida para derreter sobre a carne sem desandar.',
    origin: 'Somerset, UK',
    swatch: 'cheese',
  },
  {
    no: '04',
    name: 'Alfaces frescas',
    line: 'Hidropônicas. Colhidas no mesmo dia.',
    body: 'Alface-manteiga e mini-romana cultivadas a poucos quilômetros, colhidas e resfriadas em poucas horas.',
    origin: 'Estufa local',
    swatch: 'lettuce',
  },
];

export default function IngredientsSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.ingredients__head > *', {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ingredients__head', start: 'top 80%', once: true },
      });
      gsap.from('.ingredient-card', {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ingredients__grid', start: 'top 82%', once: true },
      });
      gsap.from('.ingredient-card__rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ingredients__grid', start: 'top 82%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ingredients" id="sourcing" ref={rootRef}>
      <div className="container">
        <div className="ingredients__head">
          <span className="eyebrow">Capítulo 02 — Procedência</span>
          <h2 className="section-title">
            Escolhidos com <em>intenção</em>
          </h2>
          <p className="ingredients__intro">
            Conhecemos pelo nome cada agricultor, padeiro e produtor de queijo. Se um ingrediente
            não pode nos contar de onde veio, ele não vai para o nosso pão.
          </p>
        </div>

        <ul className="ingredients__grid">
          {INGREDIENTS.map((item) => (
            <li key={item.no} className="ingredient-card">
              <div className={`ingredient-card__swatch swatch--${item.swatch}`} aria-hidden="true" />
              <span className="ingredient-card__no">{item.no}</span>
              <span className="ingredient-card__rule" aria-hidden="true" />
              <h3 className="ingredient-card__name">{item.name}</h3>
              <p className="ingredient-card__line">{item.line}</p>
              <p className="ingredient-card__body">{item.body}</p>
              <p className="ingredient-card__origin">
                <span>Origem</span> {item.origin}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
