async function digestMessage(message: string) {
	const msgUint8 = new TextEncoder().encode(message)
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
	return hashHex
}

const getPasswordHashWithSalt = async (password: string) => digestMessage(`VantaaFMSalt|${ password }`)

export const sendLogin = async (accountName: string, password: string) => {
	const response = await fetch('http://localhost:3000/auth/login', {
		method: 'POST',
		body: JSON.stringify({
			accountName,
			passwordHash: await getPasswordHashWithSalt(password)
		}),
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
	const responseText = await response.text()
	console.log(responseText)
}

export const sendCreateAccount = async (accountName: string, password: string) => {
	const response = await fetch('http://localhost:3000/auth/createAccount', {
		method: 'POST',
		body: JSON.stringify({
			accountName: accountName,
			passwordHash: await getPasswordHashWithSalt(password)
		}),
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
	const responseText = await response.text()
	console.log(responseText)
}
