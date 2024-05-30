import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface Message {
    text: string;
    imgUrl?: string;
    isUserMessage: boolean; // Add this line
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <Box flex={1} overflow="auto" mb={2}>
            {messages.map((message, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2} justifyContent={message.isUserMessage ? "flex-end" : "flex-start"}>
                    <Avatar src="/path-to-avatar.jpg" alt="User Avatar" sx={{ mr: 2 }} />
                    <Box bgcolor="#168AFF" p={2} borderRadius="10px" maxWidth="75%" height={"5px"} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="body1" color={"#FFFFFF"}>{message.text}</Typography>
                        {message.imgUrl && <img src={message.imgUrl} alt="sent" style={{ maxWidth: '100%' }} />}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default MessageList;
