import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Shops from "./components/Shops";
import CartPage from "./components/CartPage";
import Chat from "./components/Chat";
import AddItem from "./components/AddItem";
import CreateShop from "./components/CreateShop";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import PaymentPage from "./components/PaymentPage";
import LikedProductsPage from "./components/LikedProductsPage";
import StartPage from "./components/StartPage";
import ShopDetailPage from "./components/ShopDetailPage";
import ProductsPage from "./components/ProductsPage";

export default function App() {
  const location = useLocation(); // Get current route

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/CreateShop" element={<CreateShop />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
        <Route path="/liked-products" element={<LikedProductsPage />} />
        <Route path="/" element={<ProductsPage searchQuery="" />} />
        <Route path="/shops/:shopId" element={<ShopDetailPage />} />
      </Routes>

      {/* Conditionally render Footer only if not on StartPage */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}
