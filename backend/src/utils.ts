import { createHmac } from 'crypto'

export const getPasswordSecondHashWithSalt = (passwordHash: string) => createHmac('sha256', `vantaaFmSecond${ passwordHash }`).digest('hex')
