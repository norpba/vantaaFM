import React from 'react';
import { useMemo } from "react";
import { Routes, Route } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from "react-router-guards"
import TemporaryDrawer from './components/sidebar'
import Header from './components/header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Home from './views/Home'
import Login from './views/Login'
import CreateAccount from './views/CreateAccount'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const navigationItems = useMemo(
    () => [
      {
        key: "new",
        title: "Home",
        path: "/",
        component: Home
      },
      {
        key: "stored",
        title: "Login",
        path: "/login",
        component: Login
      },
      {
        key: "stored",
        title: "Create Account",
        path: "/createAccount",
        component: CreateAccount
      }
    ],
    []
  );
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <div>
        <Header />
        <Routes>
          {navigationItems.map(({ path, component: Component, key }) => (
            <Route
              key={key}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
        <TemporaryDrawer />
      </div>
    </ThemeProvider>
    
  );
}

export default App;