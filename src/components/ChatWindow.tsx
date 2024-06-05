import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
// @ts-ignore
import Cookies from "js-cookie";
import AccountService from "../service/AccountService";

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ text: string, imgUrl?: string, isUserMessage: boolean }>>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const clientId = Cookies.get('userId');

         AccountService.getAvatar(clientId).then((av) => {
            setAvatar(URL.createObjectURL(av.data));
        });

        const ws = new WebSocket(`ws://localhost:8080/chat`);

        ws.onopen = function open() {
            console.log('connected');

            const authToSend = {
                userId: Cookies.get("userId"),
                token: Cookies.get("token"),
                type: 'authorization'
            };
            ws.send(JSON.stringify(authToSend));
        };

        ws.onclose = function close() {
            console.log('disconnected');
        };

        ws.onmessage = function incoming(data) {
            const message = JSON.parse(data.data);

            AccountService.getAvatar(message.userId).then((av) => {
                const messageForList = {
                    text: message.message,
                    imgUrl: URL.createObjectURL(av.data),
                    isUserMessage: false
                };

                setMessages(prevMessages => [...prevMessages, messageForList]);
            }).catch((err) => {
                console.log(err);
            });
        };

        setWs(ws);

        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = (message: { text: string, imgUrl?: string, isUserMessage: boolean }) => {
        if (ws) {
            const messageToSend = {
                userId: Cookies.get("userId"),
                message: message.text,
                timestamp: Date.now(),
                type: 'text'
            };
            ws.send(JSON.stringify(messageToSend));
        }

        message.imgUrl = avatar;

        setMessages(prevMessages => [...prevMessages, message]);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width={"100%"} sx={{ backdropFilter: "blur(5px)" }}>
            <Box
                display="flex"
                flexDirection="column"
                height="90vh"
                width="100%"
                maxWidth="600px"
                p={2}
                boxShadow={3}
                borderRadius="16px"
                bgcolor="white"
            >
                <Typography variant="h4" gutterBottom>Global Chat</Typography>
                <MessageList messages={messages} />
                <MessageInput onSendMessage={handleSendMessage} />
            </Box>
        </Box>
    );
};

export default ChatWindow;
