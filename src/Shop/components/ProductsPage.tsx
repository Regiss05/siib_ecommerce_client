import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
// import onlinestore from '../../images/statics/onlinestore.svg';

// Define Product type
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
  };
}

const ProductsPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Utility: Check if product is new (5 days old)
  const isNewProduct = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    return (currentTime - createdTime) <= 5 * 24 * 60 * 60 * 1000;
  };

  // Load all products and match with likes from localStorage
  useEffect(() => {
    fetch("https://eserver.siibarnut.com//products")
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched products:', data.products); // <-- ADD THIS
        setProducts(data.products);
  
        const likedIds = JSON.parse(localStorage.getItem("likedProductIds") || "[]");
        const liked = data.products.filter((p: Product) => likedIds.includes(p._id));
        setLikedProducts(liked);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);  

  // Handle like button
  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`https://eserver.siibarnut.com//products/${id}/like`, {
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

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{
                maxWidth: '100%',
                fontSize: '12px',
                position: 'relative',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <CardMedia
                component="img"
                height="88"
                image={`https://eserver.siibarnut.com/${product.imageUrl}`}
                alt={product.name}
              />
              <CardContent sx={{ margin: 0, padding: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: 'white',
                    position: 'absolute',
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
                      position: 'absolute',
                      top: 8,
                      left: 0,
                      backgroundColor: '#FF9A00',
                      padding: '5px',
                      color: 'white',
                      borderTopRightRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  >
                    New
                  </Box>
                )}

                <Typography
                  variant="h6"
                  sx={{ fontSize: '14px', fontWeight: 'bold' }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    maxWidth: '100%',
                    fontSize: '10px',
                    color: '#9d9d9d',
                  }}
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    maxWidth: '100%',
                    fontSize: '10px',
                    color: '#9d9d9d',
                  }}
                >
                  {product.shopId?.shopName || "Unknown Shop"}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#6030ff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: '5px auto',
                  }}
                >
                  Price: {product.price} Pi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsPage;
