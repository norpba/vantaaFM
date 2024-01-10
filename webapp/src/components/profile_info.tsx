//profile_info.jsx
import { h } from 'preact'
import 'bulma/css/bulma.css' // Import Bulma styles
import '../styles/global.css' // Import your global styles

const profileInfo = () => {
	return(
		<div>
			<section class="hero is-link is-medium">
				<div class="hero-body">
					<p class="title">
						Käyttäjän Seppo (nimi muutettu) spotify käyttäjä
					</p>

				</div>

			</section>
		</div>
	)
}

export default profileInfo
