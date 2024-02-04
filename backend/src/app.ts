// src/app.ts
const express = require('express')
import { login, createDatabasePool, createAccount, verifyVantaaFmToken } from './mariadb'
import cors from 'cors'
import { getPasswordSecondHashWithSalt } from './utils'
import { Request, Response } from 'express'
import * as request from 'request'
const winston = require('winston')
import dotenv from 'dotenv';
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001
const mariaDbPool = createDatabasePool()

const client_id = '2b63d5ba3c2744268dc50fb243ccc470'
const client_secret = '0fff7549e20541a987f648f78f4b4a48'

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
	transports: [
	  new winston.transports.Console(),
	  new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
	],
})

app.get('/', (req: Request, res: Response) => {
	res.send('VantaaFM backend server!')
})

app.get('/getSpotifyToken', (req: Request, res: Response) => {
	logger.info('Handling Spotify token request');

	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
		'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
		},
		form: {
		grant_type: 'client_credentials'
		},
		json: true
	};

	request.post(authOptions, (error: any, response: request.Response, body: any) => {
		if (!error && response.statusCode === 200) {
		const token = body.access_token
		res.json({ token })
		} else {
		// Handle errors from the Spotify API request
		logger.error('Unable to get Spotify token:', error)
		res.status(response.statusCode || 500).json({ error: 'Unable to get Spotify token' })
		}
	})
})
  
app.post('/auth/login', async (req: Request, res: Response) => {
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

app.post('/auth/createAccount', async (req: Request, res: Response) => {
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

app.post('/auth/testToken', async (req: Request, res: Response) => {
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
	console.log(`Server is running at http://localhost:${port}!`)
})
