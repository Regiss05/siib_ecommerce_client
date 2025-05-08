import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  InputBase,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

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
  shopId: {
    _id: string;
    shopName: string;
  } | null;
}

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: "#f0f0f0",
  width: "100%",
  marginBottom: "15px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const ProductsPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSearch, setPopupSearch] = useState("");

  const navigate = useNavigate();

  const isNewProduct = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    return currentTime - createdTime <= 5 * 24 * 60 * 60 * 1000;
  };

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products);
        setProducts(data.products);

        const likedIds = JSON.parse(localStorage.getItem("likedProductIds") || "[]");
        const liked = data.products.filter((p: Product) => likedIds.includes(p._id));
        setLikedProducts(liked);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${id}/like`, {
        method: "POST",
      });
      const data = await res.json();

      const updatedProducts = products.map((p) =>
        p._id === id ? { ...p, likes: data.likes } : p
      );
      setProducts(updatedProducts);

      const likedProduct = updatedProducts.find((p) => p._id === id);
      const currentLikedIds = JSON.parse(localStorage.getItem("likedProductIds") || "[]");

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

  // Filter main page products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter products inside popup
  const popupFilteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(popupSearch.toLowerCase())
  );

  // Open popup when typing in search (but do not auto-close)
  useEffect(() => {
    if (searchQuery) {
      setPopupOpen(true);
      setPopupSearch(searchQuery); // Keep search synced
    }
  }, [searchQuery]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "20px" }}>
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
                image={`http://localhost:8000${product.imageUrl}`}
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

                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                    color: "#6030ff",
                  }}
                >
                  {product.shopId?.shopName || "Unknown Shop"}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#6030ff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Price: {product.price} Pi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup Dialog */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Search Products
          <IconButton onClick={() => setPopupOpen(false)}>
            ✖️
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              inputProps={{ "aria-label": "search" }}
              value={popupSearch}
              onChange={(e) => setPopupSearch(e.target.value)}
            />
          </Search>

          <Grid container spacing={2}>
            {popupFilteredProducts.map((product) => (
              <Grid item key={product._id} xs={6} sm={4} md={3}>
                <Card
                  sx={{
                    fontSize: "12px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                    setPopupOpen(false); // Close popup when clicking a product
                  }}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={`http://localhost:8000${product.imageUrl}`}
                    alt={product.name}
                  />
                  <CardContent sx={{ padding: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", color: "#9d9d9d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#6030ff", fontSize: "12px", fontWeight: "bold" }}
                    >
                      {product.price} Pi
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
