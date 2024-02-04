import React from 'react'
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Container,
	Grid,
	Link,
} from '@mui/material'

interface TrackProps {
  track: {
    name: string
    album: {
      name: string
      images: { url: string }[]
    }
    artists: { name: string; external_urls: { spotify: string } }[]
    played_at: string
  }
}

const Track: React.FC<TrackProps> = ({ track }) => {
	return (
		<Card>
			<CardMedia
				component="img"
				alt={track.name}
				height="140"
				image={track.album.images[0].url}
			/>
			<CardContent>
				<Typography variant="h5">{track.name}</Typography>
				<Typography variant="subtitle1">{track.album.name}</Typography>
				<Typography variant="subtitle2">
					{track.artists.map((artist) => (
						<Link key={artist.name} href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
							{artist.name}
						</Link>
					))}
				</Typography>
				<Typography variant="caption">Played at: {new Date(track.played_at).toLocaleString()}</Typography>
			</CardContent>
		</Card>
	)
}

export default Track

