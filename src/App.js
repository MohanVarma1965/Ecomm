import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import HeaderBanner from "./components/HeaderBanner/HeaderBanner";

function App() {
  return (
    <Router>
      <HeaderBanner />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
