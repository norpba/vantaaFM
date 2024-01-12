import * as mariaDb from 'mariadb'
import { sign } from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
export const createDatabasePool = () => {
	//todo, parse env variables!
	return mariaDb.createPool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), user: process.env.DB_USER, connectionLimit: 5, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE })
}

type AccountInfomation = {
	userId: string,
	spotifyToken: string | undefined,
}

const JWT_TOKEN_PRIVATE_KEY = process.env.JWT_TOKEN_PRIVATE_KEY

export const getAccountInformationAndJwtTokenIfAvailable = async (pool: mariaDb.Pool, accountName: string, passwordHash: string): Promise<AccountInfomation & { jwtToken: string } | undefined> => {
	if (JWT_TOKEN_PRIVATE_KEY === undefined) throw new Error('JWT_TOKEN_PRIVATE_KEY environment variable missing!')
	let conn
	try {
		conn = await pool.getConnection()
		const rows = await conn.query<AccountInfomation[]>(`
			SELECT
				auth.userId as userId,
				spotify.spotifyToken as spotifyToken
			from UserAuth auth
			left join SpotifyToken spotify on (auth.userId = spotify.userId)
			where
				accountName = (?) and
				passwordHash = (?)
			limit 1
		`, [accountName, passwordHash])
		if (rows.length !== 1) return undefined
		const accountInformation = rows[0]
		const jwtToken = sign({ _id: accountInformation.userId, accountName: accountName }, JWT_TOKEN_PRIVATE_KEY, { expiresIn: "1d" })
		return { ...accountInformation, jwtToken }
	} catch(e) {
		console.error(e)
	} finally {
		if (conn) conn.release() //release to pool
	}
	return undefined
}

export const createAccount = async (pool: mariaDb.Pool, accountName: string, passwordhash: string) => {
	let conn
	try {
		conn = await pool.getConnection()
		const res = await conn.query("INSERT INTO UserAuth (userId, passwordHash, accountName) VALUES (?, ?, ?)", [uuidv4(), passwordhash, accountName])
		//todo, look what this returns and see if its successfull o not
		console.log(res)
		return true
	} catch(e) {
		console.error(e)
	} finally {
		if (conn) conn.release() //release to pool
	}
	return false
}
