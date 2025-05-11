import React from "react";
import { Box, Modal, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Product } from "./ProductsPage";

interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
}

const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, products }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '90%',
        height: '80%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        overflowY: 'scroll',
        p: 2,
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>All Products</Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="100"
                  image={`http://localhost:8000${product.imageUrl}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography fontSize={14} fontWeight="bold">{product.name}</Typography>
                  <Typography fontSize={12} color="text.secondary">{product.price} Pi</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductPopup;
