import * as mariaDb from 'mariadb'
import { sign, verify } from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import * as funtypes from 'funtypes'
import { CreateAccountMessage, LoginMessage } from './types/networkingTypes'
export const createDatabasePool = () => {
	//todo, parse env variables!
	return mariaDb.createPool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), user: process.env.DB_USER, connectionLimit: 5, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE })
}

const JWT_TOKEN_PRIVATE_KEY = process.env.JWT_TOKEN_PRIVATE_KEY

export type JWTSignableData = funtypes.Static<typeof JWTSignableData>
export const JWTSignableData = funtypes.ReadonlyObject({ userId: funtypes.String, accountName: funtypes.String })

export const login = async (pool: mariaDb.Pool, accountName: string, passwordHash: string): Promise<LoginMessage> => {
	if (JWT_TOKEN_PRIVATE_KEY === undefined) throw new Error('JWT_TOKEN_PRIVATE_KEY environment variable missing!')
	let conn
	try {
		conn = await pool.getConnection()
		const rows = await conn.query<{userId: string, accountName: string }[]>(`
			SELECT
				auth.userId as userId,
				auth.accountName as accountName
			from UserAuth auth
			where
				accountName = (?) and
				passwordHash = (?)
			limit 1
		`, [accountName, passwordHash])
		if (rows.length !== 1) return {
			status: 400,
			success: false,
			message: 'Failed to login',
			data: { accountName },
		}
		const accountInformation = rows[0]
		const jwtToken = sign({ userId: accountInformation.userId, accountName }, JWT_TOKEN_PRIVATE_KEY, { expiresIn: "1d" })
		return {
			status: 200,
			success: true,
			message: 'Login success',
			data: { ...accountInformation, vantaaFMLoginToken: jwtToken },
		}
	} catch(e) {
		console.error(e)
		return {
			status: 400,
			success: false,
			message: 'Encountered an error on login',
			error: 'Server Error',
		}
	} finally {
		if (conn) conn.release()
	}
}

export const createAccount = async (pool: mariaDb.Pool, accountName: string, passwordhash: string): Promise<CreateAccountMessage> => {
	let conn
	try {
		conn = await pool.getConnection()
		const res = await conn.query("INSERT INTO UserAuth (userId, passwordHash, accountName) VALUES (?, ?, ?)", [uuidv4(), passwordhash, accountName])
		console.log(res)
		const loginInformation = await login(pool, accountName, passwordhash)
		if (loginInformation.success === false) {
			return {
				status: 400,
				success: false,
				message: "Encountered an error on create account",
				error: 'Failed to login with created account',
			}
		}
		return {
			status: 200,
			success: true,
			message: "Account created succesfully",
			data: loginInformation.data,
		}
	} catch(e) {
		console.error(e)
		return {
			status: 400,
			success: false,
			message: "Encountered an error on create account",
			error: 'Server Error',
		}
	} finally {
		if (conn) conn.release()
	}
}

export const verifyVantaaFmToken = (token: string) => {
	if (JWT_TOKEN_PRIVATE_KEY === undefined) throw new Error('JWT_TOKEN_PRIVATE_KEY environment variable missing!')
	const verification = JWTSignableData.parse(verify(token, JWT_TOKEN_PRIVATE_KEY))
	console.log('verifyVantaaFmToken')
	console.log(verification)
}

export const setSpotifyToken = async (pool: mariaDb.Pool, userId: string, spotifyToken: string) => {
	let conn
	try {
		conn = await pool.getConnection()
		const res = await conn.query("INSERT INTO SpotifyToken (userId, spotifyToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE", [userId, spotifyToken])
		console.log(res)
	} catch(e) {
		console.error(e)
	} finally {
		if (conn) conn.release()
	}
}

export const getSpotifyToken = async (pool: mariaDb.Pool, userId: string) => {
	let conn
	try {
		conn = await pool.getConnection()
		const rows = await conn.query<{userId: string, spotifyToken: string }[]>(`
			SELECT
				auth.userId as userId,
				spotify.spotifyToken as spotifyToken
			from UserAuth auth
			left join SpotifyToken spotify on (auth.userId = spotify.userId)
			where
				userId = (?)
			limit 1
		`, [userId])
		if (rows.length !== 1) throw Error('Did not get any rows')
		console.log(rows)
	} catch(e) {
		console.error(e)
	} finally {
		if (conn) conn.release()
	}
}
