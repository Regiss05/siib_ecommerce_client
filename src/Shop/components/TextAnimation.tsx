import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

const images = [
  'https://www.webauto.de/imgcars/de/0/15/1/32991/xxl/382298916_6.jpg?20250220183429',
  'https://s9.auto.drom.ru/photo/v2/KXJdhEG_EWK4GH1BrjCz3dJZZ87N-LxI4uDMgq0rTfSOpthSN9jvukxpkjdmdeUW7rMe8SBGfGzI1AHn/gen1200.jpg',
  'https://assets.meinauto.de/image/upload/v1708339629/website/pics/landingpages/news/2024-02/Yangwang_U8.jpg',
];

const TextAnimation: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        position: 'relative', // Required for the pseudo-element
        overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
      }}
    >
      {/* White Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white', // White background
          opacity: 0.7, // Adjust opacity to make the image partially visible
          zIndex: 1, // Ensure it's above the background image
        }}
      />

      {/* Content */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2, // Ensure it's above the white overlay
          position: 'relative', // Required for z-index to work
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{
            color: 'white',
          }}
        />
        <Box sx={{ marginLeft: '20px', color: 'white' }}>IN DEVELOPMENT</Box>
      </Box>
    </Box>
  );
};

export default TextAnimation;