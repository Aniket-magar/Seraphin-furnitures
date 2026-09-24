import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Navbar from "./components/navbar";

// Customer Pages
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart";
import InteriorServices from "./pages/InteriorServices";
import InteriorServiceDetail from "./pages/InteriorServiceDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminInteriorServices from "./pages/admin/AdminInteriorServices";
import AddInteriorService from "./pages/admin/AddInteriorService";
import EditInteriorService from "./pages/admin/EditInteriorService";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/interior-services"
          element={<InteriorServices />}
        />

        <Route
          path="/interior-services/:id"
          element={<InteriorServiceDetail />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

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

        <Route
          path="/admin/interior-services"
          element={
            <ProtectedRoute>
              <AdminInteriorServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/interior-services/add"
          element={
            <ProtectedRoute>
              <AddInteriorService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/interior-services/edit/:id"
          element={
            <ProtectedRoute>
              <EditInteriorService />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
