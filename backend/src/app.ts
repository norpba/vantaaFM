// src/app.ts
import express from 'express'
import { login, createDatabasePool, createAccount, verifyVantaaFmToken } from './mariadb'
import cors from 'cors'
import { getPasswordSecondHashWithSalt } from './utils'
import { verify } from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
const mariaDbPool = createDatabasePool()

app.get('/', (req, res) => {
	res.send('VantaaFM backend server!')
})

app.post('/auth/login', async (req, res) => {
	console.log('/auth/login')
	try {
		const user = req.body
		const { accountName, passwordHash } = user
		const loginData = await login(mariaDbPool, accountName, getPasswordSecondHashWithSalt(passwordHash))
		if (loginData.success) console.log('User logged in:', accountName)
		else console.log('Failed to log in user: ', accountName)
		res.status(loginData.status).json(loginData)
	} catch(error) {
		console.error(error)
		return res.status(400).json({ status: 400, message: 'Failed to login' })
	}
})

app.post('/auth/createAccount', async (req, res) => {
	console.log('/auth/createAccount')
	try {
		const user = req.body
		const { accountName, passwordHash } = user
		const createAccountData = await createAccount(mariaDbPool, accountName, getPasswordSecondHashWithSalt(passwordHash))
		if (createAccountData.success) console.log('Created account for user:', accountName)
		else console.log('Failed to create account for user: ', accountName)
		res.status(createAccountData.status).json(createAccountData)
	} catch(error) {
		console.error(error)
		return res.status(400).json({ status: 400, message: 'Failed to create account' })
	}
})

app.post('/auth/testToken', async (req, res) => {
	console.log('/auth/testToken')
	try {
		const token = req.body
		const { vantaaFMLoginToken } = token
		verifyVantaaFmToken(vantaaFMLoginToken)
	} catch(error) {
		console.error(error)
		return res.status(400).json({ status: 400, message: 'Failed to test jwt token' })
	}
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
