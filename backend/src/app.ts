// src/app.ts
import express from 'express'
import { getAccountInformationAndJwtTokenIfAvailable, createDatabasePool, createAccount } from './mariadb'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
const mariaDbPool = createDatabasePool()

app.get('/', (req, res) => {
	res.send('Hello, TypeScript!')
})

app.post('/auth/login', async (req, res) => {
	console.log('/auth/login')
	try {
		const user = req.body
		const { accountName, passwordHash } = user
		const info = await getAccountInformationAndJwtTokenIfAvailable(mariaDbPool, accountName, passwordHash)
		if (info === undefined) {
			console.log('user failed to login:', accountName)
			return res.status(400).json({ status: 400, message: 'Failed to login' })
		}
		console.log('user logged in:', accountName)
		res.status(200).json({
			status: 200,
			success: true,
			message: "login success",
			data: info,
		})
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
		const success = await createAccount(mariaDbPool, accountName, passwordHash)
		if (success === false) {
			console.log('Failed to create account for user: ', accountName)
			return res.status(400).json({ status: 400, message: 'Failed to create account' })
		}
		console.log('Created account for user:', accountName)
		res.status(200).json({
			status: 200,
			success: true,
			message: "account created succesfully",
			data: accountName,
		})
	} catch(error) {
		console.error(error)
		return res.status(400).json({ status: 400, message: 'Failed to create account' })
	}
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
