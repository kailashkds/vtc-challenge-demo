// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from "./RouteGurd";
import AuthProvider from "./Auth/AuthContext";

const App = () => {
    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Routes/>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
};
const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    overflow: 'hidden',
                },
            },
        },
    },
});

export default App;
