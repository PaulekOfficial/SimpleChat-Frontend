import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ text: string, imgUrl?: string, isUserMessage: boolean }>>([]);

    const handleSendMessage = (message: { text: string, imgUrl?: string, isUserMessage: boolean }) => {
        setMessages([...messages, message]);
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
