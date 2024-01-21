import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { sendCreateAccount, sendLogin } from './login'

const CreateAccountForm=()=>{
	const [account, setAccount] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
	const avatarStyle={backgroundColor:'#1bbd7e'}
	const btnstyle={margin:'8px 0'}
	return(
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid alignItems='center'>
					 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
					<h2>Create Account</h2>
				</Grid>
				<TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required onChange={(e) => { setAccount(e.target.value) }}/>
				<TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) => { setPassword(e.target.value) }}/>
				<FormControlLabel
					control={
					<Checkbox
						name="checkedB"
						color="primary"
					/>
					}
					label="Remember me"
				 />
				<Button type='submit' onClick = { () => sendCreateAccount(account, password) } color='primary' variant="contained" style={btnstyle} fullWidth>Create Account</Button>
				<Typography > Do you have an account ?
					 <Link href="/login" >
						Sign Up 
					</Link>
				</Typography>
			</Paper>
		</Grid>
	)
}

export default CreateAccountForm