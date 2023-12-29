import React, { useState } from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {confirmUserAccount} from "../Api";

const EmailConfirmationComponent = () => {
    const [isConfirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleConfirmation = () => {
        const { res } = confirmUserAccount(token)
        const timeoutId = setTimeout(() => {
            navigate('/login')
        }, 3000);
        return () => clearTimeout(timeoutId);

    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Email Confirmation
                </Typography>
                {isConfirmed ? (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            Your email has been confirmed!
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            Please click the confirmation button sent to your email.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleConfirmation}
                        >
                            Confirm Email
                        </Button>
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default EmailConfirmationComponent;
