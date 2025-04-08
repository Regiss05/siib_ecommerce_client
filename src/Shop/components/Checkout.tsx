// @ts-nocheck

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Button, Box, Typography, IconButton, CardMedia, TextField } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const { cart, totalPrice, setCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();
  const [shopNames, setShopNames] = useState<{ [key: string]: string }>({});

  const orderFees = totalPrice * 0.12; // 12% of Amount
  const tax = totalPrice * 0.18; // 18% of Amount
  const finalTotal = totalPrice + orderFees + tax; // Total = Amount + Order Fees + Tax

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address before confirming payment!");
      return;
    }

    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("You must be logged in to checkout.");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const response = await axios.post("http://localhost:8000/cart/checkout", { userId: user.uid });

      if (response.status === 200) {
        console.log("Order ID:", response.data.orderId);
        setCart([]);
        localStorage.removeItem("cart");
        toast.success("Checkout successful. Proceed to payment.");
        window.location.href = `/payment/${response.data.orderId}`;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: "20px", marginBottom: "50px" }}>
      <IconButton
        onClick={() => navigate("/Checkout")}
        sx={{ backgroundColor: "white", position: "absolute", top: 10, left: 10, border: "1px solid #ddd" }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography sx={{ marginBottom: "20px", textAlign: "center", fontSize: "18px" }}>Order summary</Typography>
      <Box>
        {cart.map((item) => (
          <Box sx={{ border: "1px solid #ddd", padding: "10px", my: "7px" }} key={item.productId}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <CardMedia component="img" image={`http://localhost:8000${item.imageUrl}`} 
                sx={{ minWidth: 110, maxWidth: 110, height: 80, filter: "grayscale(100%)" }}
              />
              <Box sx={{ color: "gray" }}>
                <Typography sx={{ fontWeight: "bold" }}>{item.product?.name} x {item.quantity}</Typography>
                <Typography>{item.product?.price ? (item.product.price * item.quantity).toFixed(2) : "0.00"} Pi</Typography>
                <Typography variant="caption" 
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", gap: "5px", backgroundColor: "#EBE8E8", borderRadius: "8px", padding: "1px 5px" }}>
                  <StoreOutlinedIcon />{shopNames[item.product?.shopId] || "Loading Shop..."}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box component="form" sx={{ '& .MuiTextField-root': { my: 2, width: '100%' } }} noValidate autoComplete="on">
        <TextField
          id="filled-multiline-static"
          label="Shipping Address"
          multiline
          rows={4}
          variant="filled"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", paddingX: "1rem", fontSize: "14px", color: "#666" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Amount:</Typography>
          <Typography>{totalPrice.toFixed(2)} Pi</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Order Fees (12%):</Typography>
          <Typography>{orderFees.toFixed(2)} Pi</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Tax (18%):</Typography>
          <Typography>{tax.toFixed(2)} Pi</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "5px", color: "#FF9A00" }}>
          <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
          <Typography sx={{ fontWeight: "bold" }}>{finalTotal.toFixed(2)} Pi</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: "1rem" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#362FFF", width: "55%", padding: "10px" }}
          onClick={handleCheckout}
        >
          Confirm Payment
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Checkout;
