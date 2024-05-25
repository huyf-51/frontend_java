import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { noneJWT } from '../../config/apiconfig';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        try {
            const response = await noneJWT.post(`/auth/signin`, userData);
            const user = response.data;
            if (user.accessToken) {
                localStorage.setItem('accessToken', user.accessToken);
            }
            navigate('/');
        } catch (error) {}
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className="bg-gradient-to-r from-orange-300 to-red-600 hover:from-pink-500 hover:to-orange-500 w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: '.8rem 0', bgcolor: '#9155FD' }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default LoginForm;
