import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import shopsloc from "../../imges/statics/shopsloc.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Favorite = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Box sx={{ width: "100%", height: "95vh" }}>
      <iframe src="https://www.google.com/maps/d/embed?mid=1HLd8in2lwquXprZuuz9-z14AgP7EhbU&ehbc=2E312F" width="100%" height="100%" title="map"></iframe>
      <Button onClick={() => navigate("/CreateShop")} sx={{ position: "relative", bottom: "20%", left: "70%", fontSize: "40px", color: "white", backgroundColor: "#362FFF", height: "80px", width: "80px", borderRadius: "50%" }}>
        +
      </Button>
    </Box>
  )
};

export default Favorite;