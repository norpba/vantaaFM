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
