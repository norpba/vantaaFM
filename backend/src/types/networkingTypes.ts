
import * as funtypes from 'funtypes'

export type LoginInformation = funtypes.Static<typeof LoginInformation>
export const LoginInformation = funtypes.ReadonlyObject({
	userId: funtypes.String,
	accountName: funtypes.String,
	vantaaFMLoginToken: funtypes.String,
})

export type LoginSuccess = funtypes.Static<typeof LoginSuccess>
export const LoginSuccess = funtypes.ReadonlyObject({
	status: funtypes.Literal(200),
	success: funtypes.Literal(true),
	message: funtypes.Literal("Login success"),
	data: LoginInformation,
})

export type CreateAccountSuccess = funtypes.Static<typeof CreateAccountSuccess>
export const CreateAccountSuccess = funtypes.ReadonlyObject({
	status: funtypes.Literal(200),
	success: funtypes.Literal(true),
	message: funtypes.Literal("Account created succesfully"),
	data: LoginInformation,
})

export type CreateAccountFailure = funtypes.Static<typeof CreateAccountFailure>
export const CreateAccountFailure = funtypes.ReadonlyObject({
	status: funtypes.Literal(400),
	success: funtypes.Literal(false),
	message: funtypes.Literal("Failed to create account"),
	data: funtypes.Object({
		accountName: funtypes.String,
	})
})

export type CreateAccountError = funtypes.Static<typeof CreateAccountError>
export const CreateAccountError = funtypes.ReadonlyObject({
	status: funtypes.Literal(400),
	success: funtypes.Literal(false),
	message: funtypes.Literal("Encountered an error on create account"),
	error: funtypes.String,
})

export type LoginFailure = funtypes.Static<typeof LoginFailure>
export const LoginFailure = funtypes.ReadonlyObject({
	status: funtypes.Literal(400),
	success: funtypes.Literal(false),
	message: funtypes.Literal("Failed to login"),
	data: funtypes.Object({
		accountName: funtypes.String,
	})
})

export type LoginError = funtypes.Static<typeof LoginError>
export const LoginError = funtypes.ReadonlyObject({
	status: funtypes.Literal(400),
	success: funtypes.Literal(false),
	message: funtypes.Literal("Encountered an error on login"),
	error: funtypes.String,
})

export type LoginMessage = funtypes.Static<typeof LoginMessage>
export const LoginMessage = funtypes.Union(LoginSuccess, LoginFailure, LoginError)

export type CreateAccountMessage = funtypes.Static<typeof CreateAccountMessage>
export const CreateAccountMessage = funtypes.Union(CreateAccountSuccess, CreateAccountFailure, CreateAccountError)

export type NetworkingMessage = funtypes.Static<typeof NetworkingMessage>
export const NetworkingMessage = funtypes.Union(LoginMessage, CreateAccountMessage)
