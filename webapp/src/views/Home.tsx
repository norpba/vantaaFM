import React from 'react'
import HeroBanner from '../components/herobanner'
import SpotifyAuth from '../components/spotify'

export default function Home() {
	return (
		<div>
			<HeroBanner />
			<SpotifyAuth />
		</div>
	)
}
