import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import CountryFilter from "./CountryFilter";
import Cathegories from "./Cathegories"; // Make sure the import path is correct
import ImageSlider from "./ImageSlider";

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
  } | null;
};

const ProductsPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eserver.siibarnut.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products);
        setProducts(data.products);

        const likedIds = JSON.parse(
          localStorage.getItem("likedProductIds") || "[]"
        );
        const liked = data.products.filter((p: Product) =>
          likedIds.includes(p._id)
        );
        setLikedProducts(liked);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (searchQuery === "show_all") {
      setShowPopup(true);
    }
  }, [searchQuery]);

  const handleClosePopup = () => {
    setShowPopup(false);
    // 👇 Reset the search query to show all products again
    setSearchQuery("");
  };

  const isNewProduct = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    return currentTime - createdTime <= 5 * 24 * 60 * 60 * 1000;
  };

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`https://eserver.siibarnut.com/products/${id}/like`, {
        method: "POST",
      });
      const data = await res.json();

      const updatedProducts = products.map((p) =>
        p._id === id ? { ...p, likes: data.likes } : p
      );
      setProducts(updatedProducts);

      const likedProduct = updatedProducts.find((p) => p._id === id);
      const currentLikedIds = JSON.parse(
        localStorage.getItem("likedProductIds") || "[]"
      );

      if (likedProduct && likedProduct.likes && likedProduct.likes > 0) {
        if (!currentLikedIds.includes(id)) {
          const updatedIds = [...currentLikedIds, id];
          localStorage.setItem("likedProductIds", JSON.stringify(updatedIds));
        }

        setLikedProducts((prev) => {
          const alreadyLiked = prev.some((p) => p._id === id);
          return alreadyLiked ? prev : [...prev, likedProduct];
        });
      } else {
        const updatedIds = currentLikedIds.filter((pid: string) => pid !== id);
        localStorage.setItem("likedProductIds", JSON.stringify(updatedIds));
        setLikedProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (searchQuery === "" || searchQuery === "show_all" || product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeCountry === "All" || product.shop?.country === activeCountry) &&
      (activeCategory === "All" || product.category === activeCategory)
  );  

  return (
    <Box>
      <Cathegories onCategorySelect={setActiveCategory} />
      <ImageSlider />
      <CountryFilter
        activeCountry={activeCountry}
        onCountrySelect={setActiveCountry}
      />
      <Box sx={{ display: "flex", flexDirection: "column", margin: "20px 20px 7rem 20px" }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
              <Card
                sx={{
                  maxWidth: "100%",
                  fontSize: "12px",
                  position: "relative",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <CardMedia
                  component="img"
                  height="88"
                  image={`https://eserver.siibarnut.com${product.imageUrl}`}
                  alt={product.name}
                />
                <CardContent sx={{ margin: 0, padding: 1 }}>
                  <IconButton
                    sx={{
                      backgroundColor: "white",
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: (product.likes || 0) > 0 ? "red" : "gray",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product._id);
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>

                  {isNewProduct(product.createdAt) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 0,
                        backgroundColor: "#FF9A00",
                        padding: "5px",
                        color: "white",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      New
                    </Box>
                  )}

                  <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "10px",
                      color: "#9d9d9d",
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ display: "flex", gap: "5px", overflowX: "auto" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "10px",
                        color: "black",
                        backgroundColor: "#eeeeee",
                        textTransform: "uppercase",
                        padding: "2px",
                        height: "13px",
                        width: "30%",
                      }}
                    >
                      {product.shop?.shopName || "Unknown Shop"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "10px",
                        color: "black",
                        backgroundColor: "#eeeeee",
                        textTransform: "uppercase",
                        padding: "2px",
                        height: "13px",
                        width: "30%",
                      }}
                    >
                      {product.shop?.country || "Unknown Country"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "10px",
                        color: "black",
                        backgroundColor: "#eeeeee",
                        textTransform: "uppercase",
                        padding: "2px",
                        height: "13px",
                        width: "30%",
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                </CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1500ff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    marginBottom: "5px",
                  }}
                >
                  Price: {product.price} Pi
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsPage;
