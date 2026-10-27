import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LAYERS, LayerVisual } from './Burger.jsx';
import './BurgerScene.css';

const clamp = (min, v, max) => Math.min(max, Math.max(min, v));

const ASSEMBLED_LAYER_OVERLAPS = {
  'bun-top': 0,
  sauce: -38,
  lettuce: -46,
  tomato: -48,
  cheese: -50,
  patty: -60,
  'bun-bottom': -50,
};

export default function BurgerScene() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const counterRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
        },
        (context) => {
          const { mobile } = context.conditions;

          // Spread factor adapts the separation distance to the viewport height
          // so the fully exploded burger always fits on screen.
          const spread = () =>
            mobile
              ? clamp(0.55, (window.innerHeight - 260) / 560, 0.95)
              : clamp(0.6, (window.innerHeight - 250) / 540, 1.2);

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!counterRef.current) return;
                const n = clamp(1, Math.ceil((self.progress / 0.85) * LAYERS.length), LAYERS.length);
                counterRef.current.textContent = String(n).padStart(2, '0');
              },
            },
          });

          // Phase 1 (0 → 0.6): separation. Top layers rise, bottom layers fall.
          LAYERS.forEach((layer) => {
            tl.to(
              `.row-${layer.key}`,
              { y: () => layer.y * spread(), scale: layer.depth, duration: 0.6, ease: 'power2.inOut' },
              0
            );
            tl.to(
              `.row-${layer.key} .scene-visual`,
              { rotation: layer.tilt, duration: 0.6, ease: 'power2.inOut' },
              0
            );
          });

          // Cinematic push-in.
          tl.to('.scene-stack', { scale: 1.08, duration: 0.6, ease: 'power2.inOut' }, 0);
          tl.to('.scene-glow', { scale: 1.35, autoAlpha: 1, duration: 0.6 }, 0);
          tl.to('.scene-progress-fill', { scaleY: 1, duration: 1 }, 0);

          if (!mobile) {
            // Labels fade in beside each layer as it separates, top first.
            LAYERS.forEach((layer, i) => {
              tl.fromTo(
                `.label-${layer.key}`,
                { autoAlpha: 0, x: layer.side === 'right' ? -24 : 24 },
                { autoAlpha: 1, x: 0, duration: 0.14, ease: 'power2.out' },
                0.2 + i * 0.045
              );
            });
          } else {
            // Mobile: a single caption slot cycles through the ingredients.
            const step = 0.1;
            LAYERS.forEach((layer, i) => {
              const at = 0.12 + i * step;
              tl.fromTo(
                `.caption-${layer.key}`,
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: step * 0.4, ease: 'power2.out' },
                at
              );
              if (i < LAYERS.length - 1) {
                tl.to(
                  `.caption-${layer.key}`,
                  { autoAlpha: 0, y: -14, duration: step * 0.35, ease: 'power2.in' },
                  at + step * 0.62
                );
              }
            });
          }

          // Closing statement once fully exploded.
          tl.fromTo(
            '.scene-closing',
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' },
            0.82
          );
          tl.to({}, { duration: 0.08 }, 0.92); // hold at the end
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="scene" id="anatomy" ref={wrapperRef} aria-label="Anatomia do burger da FORGE">
      <div className="scene-sticky" ref={stickyRef}>
        <div className="scene-glow" aria-hidden="true" />

        <header className="scene-head">
          <span className="eyebrow">Capítulo 01</span>
          <h2 className="scene-title">Seu Burger</h2>
          <p className="scene-subtitle">Feito com carinho.</p>
        </header>

        <div className="scene-progress" aria-hidden="true">
          <span className="scene-progress-count">
            <span ref={counterRef}>01</span>
            <span className="scene-progress-total"> / 07</span>
          </span>
          <span className="scene-progress-track">
            <span className="scene-progress-fill" />
          </span>
        </div>

        <div className="scene-stage">
          <div className="scene-stack">
            {LAYERS.map((layer, i) => (
              <div
                key={layer.key}
                className={`scene-row row-${layer.key}`}
                style={{ marginTop: ASSEMBLED_LAYER_OVERLAPS[layer.key], zIndex: LAYERS.length - i }}
              >
                <div className="scene-visual">
                  <LayerVisual type={layer.key} />
                </div>
                <div className={`label-anchor label-anchor--${layer.side}`}>
                  <div className={`layer-label label-${layer.key}`}>
                    <span className="layer-label__index">{layer.index}</span>
                    <h3 className="layer-label__name">{layer.name}</h3>
                    <p className="layer-label__desc">{layer.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scene-captions" aria-hidden="true">
          {LAYERS.map((layer) => (
            <div key={layer.key} className={`scene-caption caption-${layer.key}`}>
              <span className="layer-label__index">{layer.index}</span>
              <h3 className="layer-label__name">{layer.name}</h3>
              <p className="layer-label__desc">{layer.desc}</p>
            </div>
          ))}
        </div>

        <p className="scene-closing">
          Sete camadas. <em>Uma obsessão.</em>
        </p>
      </div>
    </section>
  );
}
