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

export async function redirectToAuthCodeFlow(clientId: string) {
	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	localStorage.setItem("verifier", verifier);

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("response_type", "code");							 // localhost:3030 is a placeholder for testing purposes in localhost
	params.append("redirect_uri", "http://localhost:3030/callback"); // after this is worked and on the main branch, it needs to be changed
	params.append("scope", "user-read-private user-read-email user-top-read user-read-recently-played");
	params.append("code_challenge_method", "S256");
	params.append("code_challenge", challenge);

	document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

async function generateCodeChallenge(codeVerifier: string) {
	const data = new TextEncoder().encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
	const verifier = localStorage.getItem("verifier");

	const params = new URLSearchParams();
	params.append("client_id", clientId);
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", "http://localhost:3030"); // placeholder address until the push into main branch
	params.append("code_verifier", verifier!);

	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params
	});

	const { access_token } = await result.json();
	return access_token;
}

async function fetchProfile(token: string): Promise<any> {
	// TODO: Call Web API
}

function populateUI(profile: any) {
	// TODO: Update UI with profile data
}
