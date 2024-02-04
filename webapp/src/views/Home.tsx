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
			{latestTracks ? (
				<TrackList tracks={latestTracks} />
			) : (
				<p>Loading or no tracks available.</p>
			)}		
		</div>
	)
}
