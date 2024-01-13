import React from 'react';
import { Button, Drawer } from '@mui/material'
import TemporaryDrawer from './components/sidebar'
import Header from './components/header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { sendCreateAccount, sendLogin } from './components/login/login'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <div>
        <Header />
        <h1>Material-UI with TypeScript</h1>
        <Button onClick = { sendLogin } variant="contained" color="primary">
          Login
        </Button>
        <Button onClick = { sendCreateAccount } variant="contained" color="primary">
          Create Account
        </Button>
        <Drawer></Drawer>
        <TemporaryDrawer />
      </div>
    </ThemeProvider>
  );
}

export default App;