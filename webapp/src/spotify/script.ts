const clientId = "a73c3f3e5ffb42aab2c0148f0fe91626"
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
	redirectToAuthCodeFlow(clientId);
} else {
	const accessToken = await getAccessToken(clientId, code);
	const profile = await fetchProfile(accessToken);
	populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId: string) {
	// TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId: string, code: string) {
	// TODO: Get access token for code
}

async function fetchProfile(token: string): Promise<any> {
	// TODO: Call Web API
}

function populateUI(profile: any) {
	// TODO: Update UI with profile data
}
