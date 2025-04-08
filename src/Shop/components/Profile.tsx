import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Paper,
  TextField,
  Button,
  Avatar,
  Box,
  Rating,
  Divider,
} from '@mui/material';
import { ArrowBack, Edit as EditIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(
    'https://via.placeholder.com/150' // Placeholder image
  );
  const [username, setUsername] = useState('@Siib2023');
  const [location, setLocation] = useState('BURUNDI, Bujumbura, Mutimbuzi');
  const [ownerName, setOwnerName] = useState('Luhama Muhdini');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(4.9);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setProfilePicture(e.target.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={3}>
          <Box position="relative">
            <Avatar src={profilePicture} sx={{ width: 100, height: 100 }} />
            <IconButton
              component="span"
              sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'primary.main', color: 'white' }}
              onClick={handleUploadButtonClick}
            >
              <EditIcon />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
              ref={fileInputRef}
            />
          </Box>
        </Box>

        <TextField label="Name Shop" variant="outlined" fullWidth margin="normal" defaultValue="SIIB Burundi Shop" disabled />
        <Box display="flex" alignItems="center" justifyContent="space-between" marginY={2}>
          <TextField label="Username" variant="outlined" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
          <Button variant="text">Change</Button>
        </Box>
        <TextField label="Location" variant="outlined" fullWidth margin="normal" defaultValue={location} onChange={(e) => setLocation(e.target.value)} />
        <TextField label="Name owner" variant="outlined" fullWidth margin="normal" defaultValue={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        <TextField label="Name owner" variant="outlined" fullWidth margin="normal" defaultValue={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
          <Typography variant="subtitle1">Rate</Typography>
          <Rating name="read-only" value={rating} precision={0.1} readOnly />
          <Typography variant="body2">{rating}</Typography>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Button variant="contained" fullWidth>
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;