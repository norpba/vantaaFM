import React from 'react'
import HeroBanner from '../components/herobanner'
import SpotifyAuth from '../components/spotify'
import TrackList from '../components/tracklist/Tracklist'
import { useAppContext } from '../components/context/AppContext'

export default function Home() {

	const { latestTracks } = useAppContext()

	return (
		<div>
			<HeroBanner />
			<SpotifyAuth />
			<TrackList tracks={latestTracks} />
		</div>
	)
}
