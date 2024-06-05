import React, { useState } from 'react';
import {Box, TextField, Button, Typography, Backdrop} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import AuthorizationService from "../service/AuthorizationService";
import {AxiosError} from "axios";
import ReactLoading from "react-loading";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoginStatus(true);

        try {
            const loginResult = await AuthorizationService.login(username, password);

            if (loginResult instanceof AxiosError) {
                // @ts-ignore
                setErrorMessage(loginResult.response.data.message);
                setLoginStatus(false);
                return;
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            setLoginStatus(false);
            setErrorMessage('An error occurred while logging in');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
        >
            {loginStatus && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <ReactLoading type={"bars"} color={"white"} height={'10%'} width={'10%'} />
            </Backdrop>}
            <Box
                component="form"
                onSubmit={handleLogin}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                p={2}
                bgcolor="white"
                borderRadius="16px"
                width="300px"
                mt={3}
                mb={3}
            >
                <Typography variant="h4">Login</Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" type="submit">Login</Button>
                <Box mt={2}>
                    <Typography variant="body2">Not registered? <Link to="/register">Register</Link></Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
