export const sendLogin = async () => {
	const response = await fetch('http://localhost:3000/auth/login', {
		method: 'POST',
		body: JSON.stringify({
			accountName: 'terse',
			passwordHash: 'ulilul'
		}),
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
	const responseText = await response.text()
	console.log(responseText)
}

export const sendCreateAccount = async () => {
	const response = await fetch('http://localhost:3000/auth/createAccount', {
		method: 'POST',
		body: JSON.stringify({
			accountName: 'terse',
			passwordHash: 'ulilul'
		}),
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
	const responseText = await response.text()
	console.log(responseText)
}
