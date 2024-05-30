import React, { useState } from 'react';
import {Box, TextField, IconButton, InputAdornment, Popover} from '@mui/material';
import { Send, InsertEmoticon, PhotoCamera } from '@mui/icons-material';
// @ts-ignore
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
    onSendMessage: (message: { text: string, imgUrl?: string, isUserMessage: boolean }) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleSend = () => {
        if (message.trim() || imgUrl) {
            onSendMessage({ text: message.trim(), imgUrl: imgUrl || undefined, isUserMessage: true });
            setMessage('');
            setImgUrl(null);
        }
    };

    const handleEmojiClick = (emoji: EmojiClickData) => {
        setMessage(message + emoji.emoji);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSend();
            event.preventDefault();
        }
    };

    const handleEmojiPickerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setEmojiPickerOpen(true);
    };

    const handleEmojiPickerClose = () => {
        setAnchorEl(null);
        setEmojiPickerOpen(false);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImgUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box display="flex" alignItems="center" borderRadius={"10px"}>
            <TextField
                fullWidth
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleEmojiPickerOpen}>
                                <InsertEmoticon />
                            </IconButton>
                            <IconButton component="label">
                                <PhotoCamera />
                                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                            </IconButton>
                            <IconButton onClick={handleSend}>
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Popover
                open={emojiPickerOpen}
                anchorEl={anchorEl}
                onClose={handleEmojiPickerClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Popover>
        </Box>
    );
};

export default MessageInput;
