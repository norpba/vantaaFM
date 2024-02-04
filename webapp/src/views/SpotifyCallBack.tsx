import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SpotifyCallBack: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		// Handle the callback logic here, e.g., extract the authorization code from the URL
		const params = new URLSearchParams(window.location.search)
		const code = params.get('code')
		localStorage.setItem('code', code || '')
		// Redirect back to the front page
		navigate('/')
	}, [navigate])

	return (
		<div>
			<p>Callback page</p>
			{/* You can add loading indicators or other UI elements if needed */}
		</div>
	)
}

export default SpotifyCallBack
