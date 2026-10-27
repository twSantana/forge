import { useEffect, useState } from 'react';
import './Nav.css';

const LINKS = [
  { label: 'Anatomia', href: '#anatomy' },
  { label: 'Ingredientes', href: '#sourcing' },
  { label: 'Peça o seu', href: '#reserve' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="Início da FORGE">
          FORGE
        </a>
        <nav aria-label="Navegação principal">
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={l.label === 'Peça o seu' ? 'nav__cta' : ''}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
