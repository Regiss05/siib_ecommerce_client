import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Button, Box, Card, Typography, IconButton, CardMedia, CardContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import iconshop from "../../imges/statics/iconshop.svg";

const Cart = () => {
  const { cart, setCart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [shopNames, setShopNames] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  useEffect(() => {
    const fetchCart = async () => {
      const user = getUserFromLocalStorage();
      if (!user || !user.uid) {
        console.log("User not found.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8000/cart/${user.uid}`);
        setCart(response.data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  
    // Listen for cart updates
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
  
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
  

  useEffect(() => {
    const fetchShopNames = async () => {
      const uniqueShopIds = Array.from(new Set(cart.map((item) => item.shopId).filter(Boolean)));
      const shopNameMap: { [key: string]: string } = {};
      await Promise.all(
        uniqueShopIds.map(async (shopId) => {
          try {
            const response = await axios.get(`http://localhost:8000/shops/${shopId}`);
            shopNameMap[shopId] = response.data.shop.shopName;
          } catch (error) {
            shopNameMap[shopId] = "Unknown Shop";
          }
        })
      );
      setShopNames(shopNameMap);
    };

    if (cart.length > 0) {
      fetchShopNames();
    }
  }, [cart]);

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: "white",
          position: "absolute",
          top: 10,
          left: 10,
          border: "1px solid #ddd",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography sx={{ marginBottom: "20px", textAlign: "center", fontSize: "18px", marginTop: "20px" }}>My Cart</Typography>
      <Box sx={{ backgroundColor: "#EBE8E8", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ textAlign: "center", color: "#666" }}>
          {cart.length} item{cart.length > 1 && 's'}
        </Typography>
      </Box>
      {loading ? (
        <Typography>Loading cart...</Typography>
      ) : cart.length === 0 ? (
        <Typography sx={{ textAlign: "center", padding: "20px", color: "#666" }}>To view your cart, please log in first. After logging in, add items to your cart to see them here.</Typography>
      ) : (
        <Card sx={{ padding: "16px 24px", boxShadow: "none" }}>
          {cart.map((item) => (
            <Card key={item.productId} sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              borderRadius: 1,
              padding: "5px",
              marginBottom: "10px",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Box sx={{ display: "flex", gap: "1px" }}>
                  <CardMedia component="img" image={`http://localhost:8000${item.imageUrl}`} sx={{ minWidth: 110, maxWidth: 110, height: 80 }} />
                  <CardContent>
                    <Typography sx={{ fontSize: '20px', color: "gray" }}>{item.name}</Typography>
                    <Typography variant="caption" sx={{ color: "#362FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", gap: "5px", backgroundColor: "#EBE8E8", borderRadius: "8px", padding: "1px 5px" }}>
                      <img src={iconshop} alt="shop name" />{shopNames[item.shopId] || "Loading Shop..."}
                    </Typography>
                  </CardContent>
                </Box>
                <Box sx={{ marginRight: "5px" }}>
                  <Typography sx={{ fontSize: '18px', color: "#362FFF", fontWeight: "bold", textAlign: "right" }}>{item.price ? (item.price * item.quantity).toFixed(2) : "0.00"} Pi</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#EBE8E8", borderRadius: "15px", px: "15px" }}>
                    <IconButton sx={{ width: "5px", height: "5px" }} onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: '18px', margin: '0 8px' }}>{item.quantity}</Typography>
                    <IconButton sx={{ width: "5px", height: "5px" }} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <IconButton
                onClick={() => removeFromCart(item.productId)}
                sx={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Card>
          ))}
        </Card>
      )}
      <Box sx={{ marginBottom: '17rem' }} />
      <Box
        sx={{
          position: "fixed",
          bottom: "4rem",
          backgroundColor: "white",
          width: "100%",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
          paddingTop: "1rem",
        }}
      >
        {/* Amount, Order Fees, Discount, and Total */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", paddingX: "1rem", fontSize: "14px", color: "#666" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Amount:</Typography>
            <Typography>{totalPrice.toFixed(2)} Pi</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Order Fees (12%):</Typography>
            <Typography>{(totalPrice * 0.12).toFixed(2)} Pi</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "5px", color: "#FF9A00" }}>
            <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {(totalPrice + totalPrice * 0.12).toFixed(2)} Pi
            </Typography>
          </Box>
        </Box>

        {/* Centered button */}
        <Box sx={{ display: "flex", justifyContent: "center", my: "1rem" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#362FFF",
              width: "55%",
              padding: "10px",
            }}
            onClick={() => window.location.href = "/checkout"}
          >
            Checkout
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

export default Cart;
