import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ChatWindow = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
      {messages.map((message, index) => (
        <Paper key={index} sx={{ padding: 1, backgroundColor: '#f0f0f0', marginBottom: 1 }}>
          <Typography variant="body1">
            <strong>{message.user}:</strong> {message.text}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ChatWindow;
