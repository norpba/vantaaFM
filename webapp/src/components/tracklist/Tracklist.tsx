import React from 'react'
import Track from './Track'
import { Container, Grid } from '@mui/material'

interface TrackListProps {
  tracks: { track: any }[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
	return (
		<Container>
			<Grid container spacing={2}>
				{tracks.map((item, index) => (
					<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
						<Track track={item.track} />
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default TrackList
