//import * as mariaDb from 'mariadb'
import { sign } from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
export const createDatabasePool = () => {
	return '' //return mariaDb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5 })
}

type AccountInfomation = {
	id: string,
	spotifyToken: string | undefined,
}

const NOT_SO_SECRET_SECRET = 'vantaafm koodi'

//mariaDb.Pool
export const getAccountInformationAndJwtTokenIfAvailable = async (pool: string, accountName: string, passwordHash: string): Promise<AccountInfomation & { jwtToken: string } | undefined> => {
	//let conn
	try {
		//conn = await pool.getConnection()
		//const rows = await conn.query<accountInfomation[]>('SELECT id, spotifyToken from users where account === (?) and passwordHash === (?) limit 1', [accountName, passwordHash])
		const rows = [{ id: uuidv4(), spotifyToken: 'dasd' }]
		if (rows.length !== 1) return undefined
		const accountInformation = rows[0]
		const jwtToken = sign({ _id: accountInformation.id, accountName: accountName }, NOT_SO_SECRET_SECRET, { expiresIn: "1d" })
		return { ...accountInformation, jwtToken }
	} catch(e) {
		console.error(e)
	} finally {
		//if (conn) conn.release() //release to pool
	}
	return undefined
}

export const createAccount = async (pool: string, accountName: string, passwordhash: string) => {
	let conn
	try {
		//conn = await pool.getConnection()
		//const res = await conn.query("INSERT INTO users value (?, ?, ?, ?)", [uuidv4(), accountName, passwordhash, undefined])
		return true
	} catch(e) {
		console.error(e)
	} finally {
		//if (conn) conn.release() //release to pool
	}
	return false
}
