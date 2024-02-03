import { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { sendAndSaveLogin, sendTestJwtToken } from './login'
import { LoginMessage } from '../../types/networkingTypes'

const LoginState = (param: { loginMessage: LoginMessage | undefined} ) => {
	if (param.loginMessage === undefined) return <></>
	if (param.loginMessage.success === false) {
		console.log(param.loginMessage)
		return <p style = { { color: 'red' } }> { param.loginMessage.message } </p>
	}
	return <>
		<p style = { { color: 'green' } }> { `Logged in as ${ param.loginMessage.data.accountName }` } </p>
		<Button type='submit' onClick = { sendTestJwtToken } fullWidth>Test token</Button>
	</>
}

const LoginForm = () => {
	const [account, setAccount] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loginMessage, setLoginMessage] = useState<LoginMessage | undefined>(undefined)
	const paperStyle={padding :20,height:'70vh',width:280, margin:'20px auto'}
	const avatarStyle={backgroundColor:'#1bbd7e'}
	const btnstyle={margin:'8px 0'}

	const login = async () => setLoginMessage(await sendAndSaveLogin(account, password))

	return(
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid alignItems='center'>
					 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
					<h2>Login</h2>
				</Grid>
				<TextField label='Username' placeholder='Enter username' variant='outlined' fullWidth required onChange={(e) => { setAccount(e.target.value) }}/>
				<TextField label='Password' placeholder='Enter password' type='password' variant='outlined' fullWidth required onChange={(e) => { setPassword(e.target.value) }}/>
				<FormControlLabel
					control={
					<Checkbox
						name='checkedB'
						color='primary'
					/>
					}
					label='Remember me'
				 />
				<Button type='submit' onClick = { login } color='primary' variant='contained' style={btnstyle} fullWidth>Sign in</Button>
				<Typography > Don't have an account?
					 <Link href='/createAccount' >
						Create Account
					</Link>
				</Typography>
				<LoginState loginMessage = { loginMessage }/>
			</Paper>
		</Grid>
	)
}

export default LoginForm
