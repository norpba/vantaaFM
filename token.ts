const clientId = "a73c3f3e5ffb42aab2c0148f0fe91626"
const code = undefined;

if (!code) redirectToAuthCodeFlow(clientId)
else {
	const accessToken = await fetchProfile(accessToken)
	populateUI(profile)
}

async function redirectToAuthCodeFlow(clientId: string) {
	// TODO: Redirect to Spotify authorization page 
}

async function getAccessToken(clientId: string, code: string) {
	// TODO: Get access token for code
}

async function fetchProfile(token: string): promise<any> {
	// TODO: Call Web API
}

function populateUI(profile: any) {
	// TODO: Update UI with profile data
}