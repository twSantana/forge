import './Burger.css';
import briocheTopImage from '../assets/brioche-top-latest.png';
import briocheBottomImage from '../assets/brioche-bottom-latest.png';
import cheddarImage from '../assets/aged-cheddar-latest.png';
import lettuceImage from '../assets/butter-lettuce-latest.png';
import tomatoImage from '../assets/tomato-slice.png';
import sauceImage from '../assets/ember-sauce.png';
import wagyuPattyImage from '../assets/wagyu-patty.png';

/**
 * Burger layer data, ordered top → bottom.
 * y      = separation offset (px, before viewport scaling) used by BurgerScene
 * depth  = parallax scale when separated (closer layers read slightly larger)
 * tilt   = subtle rotation of the visual when separated
 * overlap= negative margin so the assembled stack nests like a real burger
 */
export const LAYERS = [
  {
    key: 'bun-top',
    index: '07',
    name: 'Pão de Brioche ',
    desc: 'Selado no fogo da nossa forja.',
    y: -230, depth: 1.04, tilt: -2.5, overlap: 0, side: 'right',
  },
  {
    key: 'sauce',
    index: '06',
    name: 'Molho Ember',
    desc: 'Molho especial da casa.',
    y: -150, depth: 1.02, tilt: 1.5, overlap: -6, side: 'left',
  },
  {
    key: 'lettuce',
    index: '05',
    name: 'Alface',
    desc: 'Sempre fresquinha pra você.',
    y: -85, depth: 1.03, tilt: -1.5, overlap: -8, side: 'right',
  },
  {
    key: 'tomato',
    index: '04',
    name: 'Tomate',
    desc: 'Sempre fresco e suculento.',
    y: -25, depth: 1.0, tilt: 1, overlap: -6, side: 'left',
  },
  {
    key: 'cheese',
    index: '03',
    name: 'Queijo Cheddar',
    desc: 'O melhor que você vai provar.',
    y: 35, depth: 1.02, tilt: -1, overlap: -6, side: 'right',
  },
  {
    key: 'patty',
    index: '02',
    name: 'Burger Bovino',
    desc: 'Feito a temperatura que nenhum aço resiste a tanto sabor.',
    y: 100, depth: 1.05, tilt: 1.5, overlap: -14, side: 'left',
  },
  {
    key: 'bun-bottom',
    index: '01',
    name: 'Pão de Brioche',
    desc: 'Selado, garantindo que nenhum sabor escape.',
    y: 180, depth: 1.0, tilt: 0, overlap: -8, side: 'right',
  },
];

export function LayerVisual({ type }) {
  switch (type) {
    case 'bun-top':
      return <img className="lv lv-bun-top" src={briocheTopImage} alt="" aria-hidden="true" />;
    case 'sauce':
      return <img className="lv lv-sauce" src={sauceImage} alt="" aria-hidden="true" />;
    case 'lettuce':
      return <img className="lv lv-lettuce" src={lettuceImage} alt="" aria-hidden="true" />;
    case 'tomato':
      return (
        <div className="lv lv-tomato" aria-hidden="true">
          {[0, 1, 2].map((slice) => (
            <img key={slice} className={`slice slice--${slice + 1}`} src={tomatoImage} alt="" />
          ))}
        </div>
      );
    case 'cheese':
      return <img className="lv lv-cheese" src={cheddarImage} alt="" aria-hidden="true" />;
    case 'patty':
      return <img className="lv lv-patty" src={wagyuPattyImage} alt="" aria-hidden="true" />;
    case 'bun-bottom':
      return <img className="lv lv-bun-bottom" src={briocheBottomImage} alt="" aria-hidden="true" />;
    default:
      return null;
  }
}

/** Fully assembled burger (used by the hero). */
export default function Burger({ className = '' }) {
  return (
    <div className={`burger ${className}`} role="img" aria-label="Burger da FORGE montado">
      {LAYERS.map((layer, i) => (
        <div
          key={layer.key}
          className={`burger-layer burger-layer--${layer.key}`}
          style={{ marginTop: layer.overlap, zIndex: LAYERS.length - i }}
        >
          <LayerVisual type={layer.key} />
        </div>
      ))}
      <div className="burger-shadow" aria-hidden="true" />
    </div>
  );
}
