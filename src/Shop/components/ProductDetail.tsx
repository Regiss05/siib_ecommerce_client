import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography, Card, CardMedia, CardContent, IconButton, Button } from "@mui/material";
import Car from "../../imges/statics/Car.svg";
import check from "../../imges/statics/check.svg";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import cart from "../../imges/statics/cart.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  availableStock: number;
  imageUrl: string;
  likes?: number;
  createdAt: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stockDisplay, setStockDisplay] = useState<string>("");
  const [showStockCount, setShowStockCount] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (product) {
        setProduct({ ...product, likes: data.likes });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        if (data.product.availableStock > 0) {
          setStockDisplay("Available");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    if (product && product.availableStock > 0) {
      const interval = setInterval(() => {
        setShowStockCount((prev) => !prev);
        setStockDisplay((prev) =>
          prev === "Available" ? `${product.availableStock} in stock` : "Available"
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [product]);

  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return { userId: user.uid, username: user.username };
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      console.log("User details:", user);
    }
  }, []);

  const addToCart = async () => {
    if (!product) return;
  
    const user = getUserFromLocalStorage();
    if (!user || !user.userId) {
      toast.error("Please sign in to add items to your cart.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Item added to cart!");
        window.dispatchEvent(new Event("cartUpdated")); // Notify other pages
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart.");
    }
  };
  

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card sx={{ maxWidth: "600px", margin: 0, padding: 0, boxShadow: "none" }}>
        <CardMedia
          component="img"
          height="280"
          image={`http://localhost:8000${product.imageUrl}`}
          alt={product.name}
        />
        <CardContent className="product-detail">
          <IconButton
            sx={{
              backgroundColor: "white",
              position: "absolute",
              top: 10,
              right: 10,
              color: product.likes && product.likes > 0 ? "red" : "gray",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(product._id);
            }}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "white",
              position: "absolute",
              top: 10,
              left: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ddd",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <Typography sx={{ color: "#362FFF", backgroundColor: "rgba(54, 47, 255, 0.2)", padding: "5px 10px", borderRadius: "15px" }}>Burundi</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "rgba(54, 47, 255, 0.2)", padding: "5px 10px", width: "fit-content", borderRadius: "15px", margin: "10px 0" }}>
                <img src={Car} alt="car" style={{ width: "21px" }} />
                <Typography sx={{ color: "#362FFF" }}>{product.category}</Typography>
              </Box>
            </Box>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 10px",
                borderRadius: "15px",
                backgroundColor: showStockCount ? "white" : "green",
                color: showStockCount ? "black" : "white",
                fontWeight: "bold",
                width: "fit-content",
                transition: "background-color 0.5s ease",
                fontSize: "18px",
              }}
            >
              <img src={check} alt="check" style={{ width: "20px" }} />
              <Typography variant="body2">{stockDisplay}</Typography>
            </motion.div>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", borderBottom: "1px solid #9d9d9d", paddingBottom: "10px" }}>{product.name}</Typography>
          <Typography variant="body1" sx={{ color: "#9d9d9d", marginTop: "10px" }}>{product.description}</Typography>

          <Box sx={{
            position: "absolute",
            paddingTop: "1rem",
            bottom: "5rem",
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)"
          }}>
            <Box sx={{ marginLeft: "1rem" }}>
              Price:
              <Typography sx={{ color: "#0b21f5", fontWeight: "bold", fontSize: "20px" }}>{product.price} Pi</Typography>
            </Box>
            <Button
              onClick={addToCart}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#0b21f5",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                width: "11rem",
                borderRadius: "10px",
              }}
            >
              <img src={cart} alt="cart" style={{ width: "15px", marginRight: "5px" }} />
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
