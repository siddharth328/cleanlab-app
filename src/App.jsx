import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartDrawer from "./components/CartDrawer/CartDrawer.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";

import "./components/Toast/Toast.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <StoreProvider>
          <CartProvider>
            <Shell />
          </CartProvider>
        </StoreProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
