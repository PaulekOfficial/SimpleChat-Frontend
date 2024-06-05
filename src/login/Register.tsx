import React, { useState } from 'react';
import {Box, TextField, Button, Typography, Avatar, Backdrop} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import AuthorizationService from "../service/AuthorizationService";
import ReactLoading from "react-loading";
import {AxiosError} from "axios";
import AccountService from "../service/AccountService";
// @ts-ignore
import Cookies from "js-cookie";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);

    function dataURLtoFile(dataurl: string, filename: string) {
        // @ts-ignore
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        const usernameRegex = /^[a-z0-9]+$/i;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!username) {
            setErrorMessage('Username is required');
            return;
        }

        if (!usernameRegex.test(username)) {
            setErrorMessage('Username can only contain letters from a-z and numbers from 0-9');
            return;
        }

        if (!email) {
            setErrorMessage('Email is required');
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        if (!password) {
            setErrorMessage('Password is required');
            return;
        }

        if (!avatar) {
            setErrorMessage('Avatar is required');
            return;
        }

        setRegisterStatus(true);

        try {
            const registerResponse = await AuthorizationService.register(username, email, password);

            if (registerResponse instanceof AxiosError) {
                // @ts-ignore
                setErrorMessage(registerResponse.response.data.message);
                setRegisterStatus(false);
                return;
            }

            let avatarFile = dataURLtoFile(avatar as string, 'avatar.png');

            let userId = Cookies.get('userId');

            const avatarResponse = await AccountService.setAvatar(avatarFile, userId);

            if (avatarResponse instanceof AxiosError) {
                // @ts-ignore
                console.log(avatarResponse);
                setErrorMessage(registerResponse.response.data.message);
                setRegisterStatus(false);
                return;
            }

            navigate("/login");
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while registering');
            setRegisterStatus(false);
        }
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
            {registerStatus && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <ReactLoading type={"bars"} color={"white"} height={'10%'} width={'10%'} />
            </Backdrop>}
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
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
                        sx={{width: "80px", height: "80px", border: "2px solid #0081FB"}}
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