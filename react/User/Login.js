import React, { useState } from 'react';
import { loginUser } from '../Api';
import {Link, useNavigate} from 'react-router-dom';
import {TextField, Button, Container, Typography, CssBaseline, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import useAuth from "../Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const LoginForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await loginUser({
            username: formData.email,
            password: formData.password,
        });
       
        navigate('/notes');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Grid container spacing={2}>
                        <Grid  item xs={12} >
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>

                        <Grid  item xs={12}>
                            <Link to="/">
                                <Button type="button" variant="contained" color="primary" fullWidth>
                                    Sign up
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default LoginForm;
