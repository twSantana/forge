import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import './Footer.css';

const LINKS = [
  { label: 'Anatomia', href: '#anatomy' },
  { label: 'Ingredientes', href: '#sourcing' },
  { label: 'Nosso padrão', href: '#story' },
  { label: 'Peça o seu', href: '#reserve' },
];

export default function Footer() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.cta__reveal', {
        y: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.cta', start: 'top 75%', once: true },
      });
      gsap.from('.footer__brand', {
        yPercent: 40,
        autoAlpha: 0,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="cta" id="reserve">
        <div className="cta__glow" aria-hidden="true" />
        <div className="container cta__inner">
          <span className="eyebrow cta__reveal">Todas as noites, a partir das 18h</span>
          <h2 className="cta__title cta__reveal">
            Sua mesa está <em>à espera.</em>
          </h2>
          <p className="cta__text cta__reveal">
            Quarenta lugares. Um balcão de frente para o fogo. Reserve com antecedência ou mande
            uma mensagem para garantirmos seu lugar no balcão.
          </p>
          <div className="cta__actions cta__reveal">
            <a href="#reserve" className="btn btn--solid">
              Reserve sua mesa <ArrowUpRight />
            </a>
            <a href="#reserve" className="btn btn--ghost">
              <MessageCircle /> Fale pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <p className="footer__brand">FORGE</p>
              <p className="footer__tagline">Feito para ser desejado.</p>
            </div>
            <nav aria-label="Navegação do rodapé">
              <ul className="footer__links">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer__bottom">
            <p>&copy; {new Date().getFullYear()} FORGE Burger Co. Todos os direitos reservados.</p>
            <p className="footer__note">Um protótipo da RISE Marketing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
