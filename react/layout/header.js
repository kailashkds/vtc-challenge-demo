// App.js
import React from 'react';
import {AppBar, Toolbar, Typography, Container, CssBaseline, Paper, Box, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import {logout} from "../Api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '10vh',
        justifyContent: "space-between"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    loginButton: {
        marginRight: theme.spacing(2), // Adjust as needed
    },
}));

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login')
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar sx={{ flexDirection : "row", justifyContent : "space-between"}}>
                    <Typography variant="h6">Notes App</Typography>
                    <div className={classes.spacer} />
                        <Button type="button" variant="contained" color="primary" className={classes.loginButton} onClick={handleLogout}>
                            Logout
                        </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
