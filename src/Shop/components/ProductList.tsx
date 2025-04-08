import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Badge,
  Chip,
  Container,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  FilterList,
  FavoriteBorder,
  ShoppingCart,
} from '@mui/icons-material';

const products = [
  {
    id: 1,
    name: 'Iphone 12ProMax',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
    new: true,
  },
  {
    id: 2,
    name: 'SAMSUNG',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
    new: true,
  },
  {
    id: 3,
    name: 'Hp Laptop',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
  },
  {
    id: 4,
    name: 'Tablet',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
  },
  {
    id: 5,
    name: 'Refrigerator',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
    new: true,
  },
  {
    id: 6,
    name: 'Smart Tv',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
    shop: 'SHIB Shop',
    price: '0.45 Pi',
    new: true,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            All products
          </Typography>
          <IconButton color="inherit" aria-label="filter">
            <FilterList />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="product tabs">
          <Tab label="Popular" {...a11yProps(0)} />
          <Tab label="Lastest" {...a11yProps(1)} />
          <Tab label="Favorite" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs
          value={false} // No value for sub-tabs
          aria-label="product categories"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" />
          <Tab label="Car" />
          <Tab label="House" />
          <Tab label="Electronics" />
          <Tab label="Clothing" />
        </Tabs>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item xs={6} key={product.id}>
            <Card>
              {product.new && (
                <Chip
                  label="New"
                  color="primary"
                  sx={{ position: 'absolute', top: 8, left: 8 }}
                />
              )}
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" component="div">
                    {product.name}
                  </Typography>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorder />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.shop}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {product.price}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Add cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;