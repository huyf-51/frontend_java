import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { noneJWT } from '../../config/apiconfig';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import ReCAPTCHA from 'react-google-recaptcha';

import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const LoginForm = () => {
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const recaptchaRef = React.createRef();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue) {
            try {
                const response = await noneJWT.post(`/auth/signin`, userData);
                const user = response.data;
                if (user.accessToken) {
                    localStorage.setItem('accessToken', user.accessToken);
                }
                navigate('/');
            } catch (error) {
                setError(true);
            }
        } else {
            setShowAlert(true);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password *
                            </InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                name="password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <ReCAPTCHA
                            sitekey="6LemJcwpAAAAABDVelyUebNQH5k6XRSmC2K4skh6"
                            className="mt-6 ms-6"
                            ref={recaptchaRef}
                        />
                    </Grid>
                    {showAlert && (
                        <Grid item xs={12}>
                            <Alert
                                severity="warning"
                                onClose={() => {
                                    setShowAlert(false);
                                }}
                            >
                                The answer you entered for the CAPTCHA was not
                                correct.
                            </Alert>
                        </Grid>
                    )}
                    {error && (
                        <div className="text-red-500 ms-6 mt-2">
                            Incorrect email or password
                        </div>
                    )}
                    <Grid item xs={12}>
                        <Button
                            className="w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: '.8rem 0' }}
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
