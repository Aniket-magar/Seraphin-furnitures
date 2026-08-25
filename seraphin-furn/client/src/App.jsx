import Header from "./components/Header";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

       <Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/products/add"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/products/edit/:id"
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;