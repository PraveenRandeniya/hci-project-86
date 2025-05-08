import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import RoomDesigner from "./pages/RoomDesigner";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";

// Import other pages as they are created
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./pages/admin/Dashboard";
import Search from "./pages/Search";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Categories />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/room-designer" element={<RoomDesigner />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>
        </Layout>
      </AppProvider>
    </Router>
  );
}

export default App;
