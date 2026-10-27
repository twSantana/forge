import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import BurgerScene from './components/BurgerScene.jsx';
import IngredientsSection from './components/IngredientsSection.jsx';
import MadeDifferent from './components/MadeDifferent.jsx';
import Footer from './components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Web fonts change layout metrics; recalc trigger positions once they're in.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BurgerScene />
        <IngredientsSection />
        <MadeDifferent />
      </main>
      <Footer />
    </>
  );
}
