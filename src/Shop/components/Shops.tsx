import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";

const Shops = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Box sx={{ width: "100%", height: "94vh" }}>
      <iframe src="https://www.google.com/maps/d/embed?mid=1HLd8in2lwquXprZuuz9-z14AgP7EhbU&ehbc=2E312F" width="100%" height="100%" title="map"></iframe>
      <Button onClick={() => navigate("/CreateShop")} sx={{ position: "relative", bottom: "20%", left: "70%", fontSize: "40px", color: "white", backgroundColor: "#362FFF", height: "80px", width: "80px", borderRadius: "50%" }}>
        +
      </Button>
    </Box>
  )
};

export default Shops;