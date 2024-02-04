import React from 'react'
import Track from './Track'
import { Container, Grid } from '@mui/material'

interface TrackListProps {
    tracks: Array<{
      track: any;
      // Add other properties
      played_at: string; // Assuming played_at is a string, adjust the type accordingly
    }>;
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
	return (
		<Container>
			<Grid container spacing={2}>
				{tracks.map((item, index) => {
					const modifiedTrack = { ...item.track, played_at: item.played_at }
					return (
						<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
							<Track track={modifiedTrack} />
						</Grid>
					)
				})}
			</Grid>
		</Container>
	)
}
export default TrackList
