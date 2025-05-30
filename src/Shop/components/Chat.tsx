import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  TextField,
  InputAdornment,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack,
  Home as HomeIcon,
  ChatBubble as ChatIcon,
  Send as SendIcon,
  SupportAgent as SupportIcon,
} from "@mui/icons-material";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Message {
  _id?: string;
  text: string;
  senderId: string;
  timestamp: string;
}

const ChatScreen = () => {
  const [value, setValue] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = "65af3456789abcdef0123456";
  const socket = useRef(io(`${backendUrl}`));

  useEffect(() => {
    fetchMessages();
    connectWebSocket();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await axios.get(`${backendUrl}/chat/messages`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const connectWebSocket = () => {
    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.current.on("newMessage", (message: Message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, timestamp: message.timestamp.toString() },
      ]);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      await axios.post(`${backendUrl}/chat/messages`, {
        senderId: userId,
        text: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Container maxWidth="sm" style={{ padding: 0 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ backgroundColor: "white", width: "90%", height: "55%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ backgroundColor: "white", position: "absolute", top: 10, left: 10, border: "1px solid #ddd" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography sx={{ fontSize: "18px" }}>Chat</Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 112px)",
          position: "relative",
          overflowY: "auto",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        {loadingMessages ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ marginBottom: "5rem" }}>
            {messages.map((message, index) => {
              const isRightAligned = index % 2 === 0;
              return (
                <ListItem
                  key={index}
                  style={{
                    justifyContent: isRightAligned ? "flex-end" : "flex-start",
                  }}
                >
                  {!isRightAligned && (
                    <Avatar sx={{ marginRight: 1 }}>
                      <SupportIcon />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "20px",
                      backgroundColor: isRightAligned ? "#DCF8C6" : "#fff",
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      secondary={new Date(message.timestamp).toLocaleTimeString()}
                      style={{
                        textAlign: isRightAligned ? "right" : "left",
                      }}
                    />
                  </Paper>
                  {isRightAligned && (
                    <Avatar sx={{ marginLeft: 1 }}>
                      <SupportIcon />
                    </Avatar>
                  )}
                </ListItem>
              );
            })}
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      <Box
        sx={{
          paddingBottom: "40px",
          width: "100%",
          textAlign: "center",
          borderRadius: "10px",
          borderBottomRightRadius: "7px",
          backgroundColor: "rgba(255, 255, 255)",
          position: "fixed",
          bottom: '3rem',
        }}
      >
        <TextField
          sx={{ width: "95%" }}
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage} disabled={loading}>
                  {loading ? (
                    <Box sx={{ width: 20, height: 20 }}>
                      <CircularProgress size={20} />
                    </Box>
                  ) : (
                    <SendIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />

      <BottomNavigation value={value} onChange={(event, newValue) => setValue(newValue)} showLabels>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
      </BottomNavigation>
    </Container>
  );
};

export default ChatScreen;
