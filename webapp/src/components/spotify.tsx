import { access } from 'fs'
import React, { useEffect, useState } from 'react'

const SpotifyProfile: React.FC = () => {
	const [profile, setProfile] = useState<any | null>(null)
	const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<any | null>(null)

	useEffect(() => {
		const clientId = '2b63d5ba3c2744268dc50fb243ccc470'
		const code = localStorage.getItem('code')
		const accessToken = localStorage.getItem('vantaa_fm_token')
  
		const fetchData = async () => {
			if (!code) {
				console.log('Fetch code')
				// Redirect to Spotify authorization page if there's no code
				redirectToAuthCodeFlow(clientId)
			} else {
				try {
					// Get access token for the code
					const fetchedAccessToken = await getAccessToken(clientId, code)
					localStorage.removeItem('code')
  
					// Fetch the user profile using the access token
					console.log(fetchedAccessToken)
  
					// Update the state with the profile data
					const userProfile = await fetchProfile(fetchedAccessToken)
					console.log(userProfile)
					setProfile(userProfile)
				} catch (error) {
					console.log(error)
				}
			}
		}
  
		const fetchProfileWithToken = async () => {
			try {
				if (accessToken) {
					// Fetch the user profile using the existing access token
					const userProfile = await fetchProfile(accessToken)
					const recentlyPlayedTracks = await fetchRecentlyPlayed(accessToken)
					setRecentlyPlayedTracks(recentlyPlayedTracks)
					setProfile(userProfile)
					console.log(userProfile)
					console.log(recentlyPlayedTracks)
				}
			} catch (error: any) {
				console.log(error)
			}
		}
  
		if (accessToken) {
			fetchProfileWithToken()
		} else {
			fetchData()
		}
	}, []) // Empty dependency array means it runs once on mount
  
	const redirectToAuthCodeFlow = async (clientId: string) => {
		const verifier = generateCodeVerifier(128)
		const challenge = await generateCodeChallenge(verifier)

		localStorage.setItem("verifier", verifier)

		const params = new URLSearchParams()
		params.append("client_id", clientId)
		params.append("response_type", "code")
		params.append("redirect_uri", "http://localhost:3000/callback")
		params.append("scope", "user-read-private user-read-email user-read-recently-played")
		params.append("code_challenge_method", "S256")
		params.append("code_challenge", challenge)
    
		document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
	}

	const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
		const data = new TextEncoder().encode(codeVerifier)
		const digest = await window.crypto.subtle.digest('SHA-256', data)
  
		// Convert the Uint8Array to a regular array of numbers
		const array = Array.from(new Uint8Array(digest))
  
		// Use String.fromCharCode with the spread operator
		return btoa(String.fromCharCode(...array))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '')
	}

	const generateCodeVerifier = (length: number) => {
		let text = ''
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		}
		return text
	}

	const getAccessToken = async (clientId: string, code: string): Promise<string> => {
		const verifier = localStorage.getItem("verifier")
		const params = new URLSearchParams()
		params.append("client_id", clientId)
		params.append("grant_type", "authorization_code")
		params.append("code", code)
		params.append("redirect_uri", "http://localhost:3000/callback")
		params.append("code_verifier", verifier!)

		const result = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: params
		})

		const { access_token } = await result.json()
		localStorage.setItem('vantaa_fm_token', access_token || '')
		return access_token
	}

	const fetchProfile = async (token: string): Promise<any> => {
		const response = await fetch("https://api.spotify.com/v1/me", {
			method: "GET", headers: { Authorization: `Bearer ${token}` }
		})
		return await response.json()
	}

	const fetchRecentlyPlayed = async (token: string): Promise<any> => {
		console.log(token)
		const apiUrl = 'https://api.spotify.com/v1/me/player/recently-played'
		fetch(apiUrl, {
			method: 'GET',
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		  })
			.then(response => {
			  if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
			  }
			  return response.json()
			})
			.then(data => {
			  const recentlyPlayedTracks = data.items
			  console.log(recentlyPlayedTracks)
			  return recentlyPlayedTracks
			})
			.catch(error => {
			  console.error('Error fetching recently played tracks:', error.message)
			})
	}

	const populateUI = (profile: any) => {
		// TODO: Implement updating UI with profile data
		// This function can be used to update your React component state or render UI components
	}

	return (
		<div>
			{profile ? (
				<div>
					<p>Welcome, {profile.display_name}!</p>
					<p>Email: {profile.email}</p>
					{/* Add more profile information as needed */}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default SpotifyProfile
