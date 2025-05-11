import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
    shopName: string;  // This is correctly being populated
    fullName: string;  // Ensure fullName is here as well
    country: string;
  } | null;
}

const LikedProductsPage: React.FC = () => {
  const location = useLocation();
  const { liked } = location.state || { liked: [] };  // Get liked products passed via state

  // If there are no liked products
  if (liked.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Typography variant="h5">You have no liked products yet!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Liked Products
      </Typography>
      <Grid container spacing={3}>
        {liked.map((product: Product) => (
          <Grid item key={product._id} xs={6} sm={4} md={3} lg={2}>
            <Card sx={{ maxWidth: '100%', fontSize: '12px', position: 'relative', borderRadius: '10px' }}>
              <CardMedia
                component="img"
                height="88"
                image={`https://eserver.siibarnut.com${product.imageUrl}`}
                alt={product.name}
              />
              <CardContent sx={{ margin: 0, padding: 1 }}>
                <IconButton sx={{ backgroundColor: 'white', position: 'absolute', top: 10, right: 10, color: 'red' }}>
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
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
                <Typography variant="body1" sx={{ color: '#6030ff', fontSize: '16px', fontWeight: 'bold' }}>
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

export default LikedProductsPage;
