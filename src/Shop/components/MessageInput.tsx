import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import {Send} from '@mui/icons-material';
const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        label="Type a message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button onClick={handleSend} variant="contained">
      <Send/>
      </Button>
    </Box>
  );
};

export default MessageInput;
