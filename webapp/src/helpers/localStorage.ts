
import { LoginInformation } from '../types/networkingTypes'

const loginInformationStorageKey = 'loginInformation'
export const saveLoginInformation = (info: LoginInformation) => {
	window.localStorage.setItem(loginInformationStorageKey, JSON.stringify(LoginInformation.serialize(info)))
}

export const getLoginInformation = () => {
	const info = window.localStorage.getItem(loginInformationStorageKey)
	if (info === null) return undefined
	return LoginInformation.parse(JSON.parse(info))
}
