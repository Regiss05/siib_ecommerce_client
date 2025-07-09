import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import Car from "../../imges/statics/Car.svg";
import check from "../../imges/statics/check.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import cart from "../../imges/statics/cart.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  availableStock: number;
  imageUrl: string;
  likes?: number;
  createdAt: string;
  shop: {
    _id: string;
    shopName: string;
    fullName: string;
    country: string;
    shopLogo: string;
    email: string;
    city: string;
    phoneNumber: string;
  } | null;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stockDisplay, setStockDisplay] = useState<string>("");
  const [showStockCount, setShowStockCount] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"description" | "similar">("description");
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`${backendUrl}/products/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (product) {
        setProduct({ ...product, likes: data.likes });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetch(`${backendUrl}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);

        console.log('Product details: ', data.product);
        console.log('shop details: ', data.shop);
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
      const response = await fetch(`${backendUrl}/cart/add`, {
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
        window.dispatchEvent(new Event("cartUpdated"));
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
          image={`${backendUrl}/${product.imageUrl}`}
          alt={product.name}
          sx={{
            borderRadius: "0 0 30px 30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <CardContent className="product-detail">
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

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {product.shop ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#362FFF",
                    backgroundColor: "rgba(54, 47, 255, 0.2)",
                    padding: "5px 10px",
                    borderRadius: "15px",
                  }}
                >
                  {product.shop.country}
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray" }}>
                  Unknown country
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "rgba(54, 47, 255, 0.2)",
                  padding: "5px 10px",
                  borderRadius: "15px",
                }}
              >
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
                fontSize: "18px",
              }}
            >
              <img src={check} alt="check" style={{ width: "20px" }} />
              <Typography variant="body2">{stockDisplay}</Typography>
            </motion.div>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", paddingY: "15px", borderBottom: "1px solid #ddd" }}>
            {product.name}
          </Typography>

          <Typography sx={{ color: "gray", marginTop: "10px" }}>Seller informations</Typography>

          {product?.shop ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              {product.shop.shopLogo && (
                <img
                  src={`${backendUrl}/${product.shop.shopLogo}`}
                  alt="Shop Logo"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                  }}
                />
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Box>
                  <Typography sx={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "15px" }}>
                    {product.shop.shopName}
                  </Typography>
                  <Typography sx={{ textTransform: "capitalize", color: "gray" }}>
                    {product.shop.fullName}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#362FFF", cursor: "pointer" }}
                  onClick={() => setShowMoreInfo(true)}
                >
                  More infos
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray" }}>
              Unknown Shop
            </Typography>
          )}

          {/* Toggle Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: "20px", borderBottom: "1px solid #ddd" }}>
            <Button
              onClick={() => setActiveTab("description")}
              sx={{
                textTransform: "none",
                backgroundColor: "transparent",
                color: activeTab === "description" ? "#0b21f5" : "gray",
                boxShadow: "none",
                border: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Description
            </Button>
            <Button
              onClick={() => setActiveTab("similar")}
              sx={{
                textTransform: "none",
                backgroundColor: "transparent",
                color: activeTab === "similar" ? "#0b21f5" : "gray",
                boxShadow: "none",
                border: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Similar Products
            </Button>
          </Box>

          {/* Conditional Content */}
          {activeTab === "description" ? (
            <Typography
              variant="body1"
              sx={{ color: "#9d9d9d", marginTop: "10px", overflow: "auto", height: "300px" }}
            >
              {product.description}
            </Typography>
          ) : (
            <Box sx={{ marginTop: "10px", height: "300px", overflow: "auto" }}>
              <Typography>Similar products will appear here.</Typography>
              {/* Add logic to fetch and render similar products here */}
            </Box>
          )}

          {/* Bottom Bar */}
          <Box
            sx={{
              padding: "10px",
              position: "fixed",
              bottom: "4rem",
              left: 0,
              width: "97%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 99,
            }}
          >
            <Box>
              Price:
              <Typography sx={{ color: "#0b21f5", fontWeight: "bold", fontSize: "20px" }}>
                {product.price} Pi
              </Typography>
            </Box>
            <Button
              onClick={addToCart}
              sx={{
                backgroundColor: "#0b21f5",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                borderRadius: "10px",
              }}
            >
              <img src={cart} alt="cart" style={{ width: "15px" }} />
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Shop More Info Popup */}
      <AnimatePresence>
        {showMoreInfo && (
          <Box>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 999,
              }}
              onClick={() => setShowMoreInfo(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "50%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4 }}
              style={{
                position: "fixed",
                top: "-15rem",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "white",
                zIndex: 9999,
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                boxShadow: "0px -2px 20px rgba(0, 0, 0, 0.3)",
                overflowY: "auto",
              }}
            >
              <Typography sx={{ textAlign: "center", padding: "50px", backgroundColor: "#362FFF", color: "white" }}>Shop Profile</Typography>
              {product.shop ? (
                <Box sx={{ padding: "0 20px 20px 20px" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: "-30px" }}>
                    {product.shop.shopLogo && (
                      <img
                        src={`${backendUrl}${product.shop.shopLogo}`}
                        alt="Shop Logo"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                        }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop Name:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.shopName}
                  </Typography>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop Owner:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.fullName}
                  </Typography>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop Email:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.email}
                  </Typography>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop Country:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.country}
                  </Typography>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop City:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.city}
                  </Typography>
                  <Typography sx={{ padding: 0, margin: 0, color: "gray", fontSize: "12px" }}>Shop Phone Number:</Typography>
                  <Typography sx={{ fontSize: "15px", backgroundColor: "rgba(155, 155, 155, 0.2)", padding: "5px 10px" }}>
                    {product.shop.phoneNumber}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "gray" }}>
                  Unknown Shop
                </Typography>
              )}
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ProductDetail;
