import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import startPic from '../../imges/statics/startpic.png';
import logo from '../../imges/statics/logo.svg';
import { useNavigate } from "react-router-dom";
import shopping from '../../imges/statics/shopping.svg';
import bankico from '../../imges/statics/bankIco.png';
import stars from '../../imges/statics/stars.png';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        // position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        backgroundImage: `url(${startPic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        textAlign: 'center',
        padding: 4,
        overflow: 'hidden',
      }}
    >
      {/* Overlay for reduced opacity effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography sx={{ fontWeight: "bold" }} gutterBottom>Welcome To</Typography>

        <img
          src={logo}
          alt="Logo"
          style={{
            width: '150px',
            height: 'auto',
            marginBottom: '16px',
          }}
        />

        <Typography sx={{ fontSize: "12px", textTransform: "none", lineHeight: 1, color: "gray", paddingY: 5 }}>
          The SIIB system combines SIIB E-Commerce and SIIB E-Bank to create a seamless digital shopping and payment experience. Users can buy quality products using Pi Coin on SIIB E-Commerce, while managing their transactions securely through SIIB E-Bank. Together, they offer a complete ecosystem for smart, decentralized living.
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          width="100%"
        >
          <Button
            onClick={() => navigate("/home")}
            sx={{
              flexDirection: "column",
              color: "white",
              backgroundColor: "#362FFF",
              paddingX: 2,
              paddingY: 5,
              borderRadius: "10px",
              // borderTopRightRadius: 0,
              // borderBottomLeftRadius: "10px",
              // borderBottomRightRadius: 0,
              width: '50%',
            }}
          >
            <img
              src={shopping}
              alt="Shopping"
              style={{
                width: '50px',
                height: '50px',
                marginBottom: 8,
              }}
            />
            <Typography sx={{ fontSize: "13px", marginBottom: "10px", fontWeight: "bold" }}>SIIB E-commerce</Typography>
            <Typography sx={{ fontSize: "12px", textTransform: "none", lineHeight: 1 }}>Access your exclusive benefits</Typography>
          </Button>

          {/* <Button
            onClick={() => window.location.href = 'https://bank.siibarnut.com'}
            sx={{
              flexDirection: "column",
              color: "white",
              backgroundColor: "#FF9A00",
              padding: 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: "10px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: "10px",
              width: '50%',
            }}
          >
            <img
              src={bankico}
              alt="Bank"
              style={{
                width: '50px',
                height: '50px',
                marginBottom: 8,
              }}
            />
            <Typography sx={{ fontSize: "13px", marginBottom: "10px", fontWeight: "bold" }}>SIIB E-Bank</Typography>
            <Typography sx={{ fontSize: "12px", textTransform: "none", lineHeight: 1 }}>Manage your assets with complete transparency</Typography>
          </Button> */}
        </Box>

        {/* Testimonial */}
        <Box sx={{ backgroundColor: "#E6E7E8", borderRadius: "20px", border: "1px solid #D0D0D0", padding: 2, marginY: 5 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
            <Box sx={{ height: "50px", width: "50px", backgroundColor: "white", borderRadius: "50%" }}></Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Roland Cibyebi</Typography>
              <Typography sx={{ fontSize: "12px" }}>Director New Vision</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: "12px", textTransform: "none", lineHeight: 1, color: "gray", textAlign: 'left' }}>
            Using the SIIB system has completely changed the way I shop and manage my finances. I love how easy it is to buy products with Pi Coin on SIIB E-Commerce and instantly track my payments through SIIB E-Bank. It’s fast, secure, and incredibly convenient!
          </Typography>
          <img
            src={stars}
            alt="Stars"
            style={{
              width: 'auto',
              height: 'auto',
              alignItems: 'left',
              display: 'flex',
              marginTop: '10px',
            }}
          />
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            bottom: 1,
            width: '100%',
            textAlign: 'center',
            color: 'gray',
            zIndex: 2,
            fontSize: '12px',
          }}
        >
          © {new Date().getFullYear()} SIIB. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default StartPage;
