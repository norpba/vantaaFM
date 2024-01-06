// Hero.jsx
import { h } from 'preact'
import 'bulma/css/bulma.css' // Import Bulma styles
import '../styles/global.css' // Import your global styles

const Hero = () => {
  return (
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">
                	Tervetuloa käyttäjä "Seppo" (nimi muutettu)
                </p>
                <p class="subtitle">
                	Vantaa FM palveluun
                </p>
            </div>
        </section>
    </div>
  );
};

export default Hero;