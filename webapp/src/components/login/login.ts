import { getLoginInformation, saveLoginInformation } from '../../helpers/localStorage'
import { CreateAccountMessage, LoginMessage } from '../../types/networkingTypes'

async function digestMessage(message: string) {
	const msgUint8 = new TextEncoder().encode(message)
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
	return hashHex
}

const getPasswordHashWithSalt = async (password: string) => digestMessage(`VantaaFMSalt|${ password }`)

export const sendAndSaveLogin = async (accountName: string, password: string): Promise<LoginMessage> => {
	try {
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
		const loginMessage = LoginMessage.parse(JSON.parse(await response.text()))
		if (loginMessage.success) saveLoginInformation(loginMessage.data)
		return loginMessage
	} catch(error: unknown) {
		console.error(error)
		return {
			status: 400,
			success: false,
			message: 'Encountered an error on login',
			error: error instanceof Error ? error.toString() : 'Unknown error',
		}
	}
}

export const sendAndSaveCreateAccount = async (accountName: string, password: string): Promise<CreateAccountMessage> => {
	try {
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
		const createAccountMessage = CreateAccountMessage.parse(JSON.parse(await response.text()))
		if (createAccountMessage.success) saveLoginInformation(createAccountMessage.data)
		return createAccountMessage
	} catch(error: unknown) {
		console.error(error)
		return {
			status: 400,
			success: false,
			message: 'Encountered an error on create account',
			error: error instanceof Error ? error.toString() : 'Unknown error',
		}
	}
}

export const sendTestJwtToken = async () => {
	const data = getLoginInformation()
	if (data === undefined) return console.error('No Login data!')
	try {
		const response = await fetch('http://localhost:3000/auth/testToken', {
			method: 'POST',
			body: JSON.stringify({
				vantaaFMLoginToken: data.vantaaFMLoginToken,
			}),
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		console.log(response)
	} catch(error: unknown) {
		console.error(error)
	}
}
