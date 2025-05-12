import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Grid } from "@mui/material";

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

interface Shop {
  _id: string;
  shopName: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  phoneNumber: string;
  shopLogo?: string;
}

const ShopDetailPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch shop details
    fetch(`${backendUrl}/shops/${shopId}`)
      .then((res) => res.json())
      .then((data) => setShop(data.shop))
      .catch((err) => console.error("Error fetching shop:", err));

    // Fetch products belonging to the shop
    fetch(`${backendUrl}/products?shopId=${shopId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, [shopId]);

  if (!shop) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {shop.shopName}
      </Typography>
      <Typography>Owner: {shop.fullName}</Typography>
      <Typography>Email: {shop.email}</Typography>
      <Typography>Country: {shop.country}</Typography>
      <Typography>City: {shop.city}</Typography>
      <Typography>Phone: {shop.phoneNumber}</Typography>

      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        Products from this shop
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <img src={`${backendUrl}${product.imageUrl}`} alt={product.name} width="100%" />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="subtitle1">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopDetailPage;
