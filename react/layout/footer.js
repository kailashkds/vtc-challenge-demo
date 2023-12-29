// App.js
import React from 'react';
import {Typography, Container, CssBaseline, Box, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
}));
const Footer = (theme) => {
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            <Box component="footer">
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; 2023 Your Notes App. All rights reserved.
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;
