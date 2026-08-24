import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App; // ✅ VERY IMPORTANT