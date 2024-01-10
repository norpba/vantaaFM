// Hero.jsx
import { h } from 'preact'
import 'bulma/css/bulma.css' // Import Bulma styles
import '../styles/global.css' // Import your global styles
import { sendCreateAccount, sendLogin } from './login'
import { connectToSpotify } from './script'

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
				<button onClick = { sendLogin }>Login</button>
				<button onClick = { sendCreateAccount }>Create Account</button>
				<button onClick = { connectToSpotify }>Connect to spotify</button>
            </div>
        </section>

		<section class="hero is-info">

		</section>
    </div>
  )
}

export default Hero
