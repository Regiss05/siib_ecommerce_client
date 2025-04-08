import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, IconButton, Typography, Box, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import onlinestore from '../../imges/statics/onlinestore.svg';

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
}

const ProductsPage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const isNewProduct = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    return (currentTime - createdTime) <= 5 * 24 * 2 * 60 * 1000; // 5 days in milliseconds
  };

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${id}/like`, { method: "POST" });
      const data = await res.json();
      setProducts(products.map((p) =>
        p._id === id ? { ...p, likes: data.likes } : p
      ));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 20px 5rem 20px', gap: 2 }}>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
            <Card sx={{ maxWidth: '100%', fontSize: '12px', position: 'relative', borderRadius: '10px', cursor: 'pointer' }}
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
                  sx={{ backgroundColor: 'white', position: "absolute", top: 10, right: 10, color: (product.likes || 0) > 0 ? "red" : "gray" }}
                  onClick={(e) => { e.stopPropagation(); handleLike(product._id); }}
                >
                  <FavoriteIcon />
                </IconButton>
                {isNewProduct(product.createdAt) && (
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    left: 0,
                    backgroundColor: '#FF9A00',
                    padding: '5px',
                    color: 'white',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}>
                    New
                  </Box>
                )}
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{product.name}</Typography>
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
                <img src={onlinestore} alt="online store" />SIIB
                <Typography variant="body1" sx={{ color: '#6030ff', fontSize: '16px', fontWeight: 'bold', margin: '5px auto' }}>
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
