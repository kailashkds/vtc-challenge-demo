import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './layout/header';
import Footer from './layout/footer';
import SignUpForm from "./User/SignUpForm";

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

function MasterComponent() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
                <SignUpForm />
            <Footer />
        </ThemeProvider>
    );
}

export default MasterComponent;
