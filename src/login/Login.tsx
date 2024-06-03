import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
        >
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