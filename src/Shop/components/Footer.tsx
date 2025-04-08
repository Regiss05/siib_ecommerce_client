import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ChatIcon from "@mui/icons-material/Chat";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { useCart } from "../context/CartContext";  // Import useCart

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { cart } = useCart();  // Get cart items

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/favorite");
        break;
      case 2:
        navigate("/add");
        break;
      case 3:
        navigate("/cart");
        break;
      case 4:
        navigate("/chat");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingBottom: "13px",
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ "&.Mui-selected": { color: "#362fff" } }} />
        <BottomNavigationAction label="Shops" icon={<StoreOutlinedIcon />} sx={{ "&.Mui-selected": { color: "#362fff" } }} />
        <BottomNavigationAction icon={<AddCircleIcon sx={{ fontSize: "60px" }} />} sx={{ "&.Mui-selected": { color: "#362fff" } }} />
        
        {/* Cart with Badge */}
        <BottomNavigationAction
          label="Cart"
          icon={
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartCheckoutIcon />
            </Badge>
          }
          sx={{ "&.Mui-selected": { color: "#362fff" } }}
        />
        
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} sx={{ "&.Mui-selected": { color: "#362fff" } }} />
      </BottomNavigation>
    </Paper>
  );
}
