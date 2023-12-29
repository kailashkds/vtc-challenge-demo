import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import {createUser, loginUser} from "../Api";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));
const SignUpForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isEmailUnique, setIsEmailUnique] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEmailBlur = async () => {
        // Assume you have an API endpoint to check email uniqueness
        const response = await fetch('/api/user/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
        });

        const result = await response.json();
        console.log(result)
        setIsEmailUnique(result.isUnique);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await createUser(formData);
    };

    return (
        <>
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: '25px' }}>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleEmailBlur}
                                    required
                                    error={isEmailUnique}
                                    helperText={isEmailUnique && 'This email is already taken.'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid  item xs={12} style={{ marginTop : "10px" }}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Sign Up
                                </Button>
                            </Grid>

                            <Grid  item xs={12}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button type="button" variant="contained" color="primary" fullWidth>
                                        Login
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default SignUpForm;
