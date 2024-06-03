import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import {Link} from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Avatar: ${avatar}`);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
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
            <Box
                component="form"
                onSubmit={handleRegister}
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
                <Typography variant="h4">Register</Typography>
                <label htmlFor="avatar-upload">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <Avatar
                        src={avatar as string}
                        sx={{width: "80px", height: "80px", border: "2px solid #0081FB"}} // Dodajemy niebieską obwódkę
                    />
                </label>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button variant="contained" type="submit">Register</Button>
                <Box mt={2}>
                    <Typography variant="body2">You have an account? <Link to="/login">Login</Link></Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;