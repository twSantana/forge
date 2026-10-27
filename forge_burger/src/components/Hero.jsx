import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import heroBurgerImage from '../assets/hero-burger.png';
import './Hero.css';

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('.hero__glow', { autoAlpha: 0, scale: 0.6, duration: 2.2, ease: 'power2.out' }, 0)
        .from('.hero__line-inner', { yPercent: 110, duration: 1.4, stagger: 0.14 }, 0.15)
        .from('.hero__burger-image', { y: 36, autoAlpha: 0, scale: 0.92, duration: 1.1 }, 0.35)
        .from('.hero__meta > *', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.0)
        .from('.hero__scroll', { autoAlpha: 0, y: -10, duration: 0.8 }, 1.4);

      // Idle float once assembled.
      gsap.to('.hero__burger-float', {
        y: -12,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      gsap.to('.hero__scroll-arrow', {
        y: 8,
        duration: 1.1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__stage">
        <h1 className="hero__title">
          <span className="hero__line">
            <span className="hero__line-inner">O MELHOR</span>
          </span>
          <span className="hero__line hero__line--accent">
            <span className="hero__line-inner">
              DA <em>cidade.</em>
            </span>
          </span>
        </h1>

        <div className="hero__burger">
          <div className="hero__burger-float">
            <img className="hero__burger-image" src={heroBurgerImage} alt="FORGE" />
          </div>
        </div>
      </div>

      <div className="hero__meta container">
        <p className="hero__sub">
          O burger Feito com obsessão.
          <br />
          Anos de experiência.
        </p>
        <div className="hero__actions">
          <a href="#reserve" className="btn btn--solid">
            Peça o seu! <ArrowUpRight />
          </a>
          <a href="#anatomy" className="btn btn--ghost">
            Ver Anatomia <ArrowUpRight />
          </a>
        </div>
      </div>

      <a href="#anatomy" className="hero__scroll" aria-label="Rolar até a anatomia do burger">
        <span role="presentation">Rolar</span>
        <ArrowDown className="hero__scroll-arrow" />
      </a>
    </section>
  );
}
