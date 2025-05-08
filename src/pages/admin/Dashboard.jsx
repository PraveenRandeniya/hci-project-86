import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, getAllOrders, products, setProducts } =
    useAppContext();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // Redirect if not admin
  if (!user || !isAdmin) {
    navigate("/");
    return null;
  }

  const orders = getAllOrders();

  // Calculate dashboard statistics
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = products.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  // Get recent orders (last 2)
  const recentOrders = orders.slice(-2);

  // Get top selling products (first 2 for demo)
  const topSellingProducts = products.slice(0, 2);

  // Handlers for product management
  const handleAddProduct = () => {
    const prod = {
      ...newProduct,
      id: Date.now().toString(),
      price: parseFloat(newProduct.price),
    };
    setProducts((prev) => [...prev, prod]);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };
  const handleDeleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));
  const handleEditInit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({
      name: product.name,
      price: product.price.toString(),
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
    });
  };
  const handleEditChange = (field, value) =>
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  const handleEditSave = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: editedProduct.name,
              price: parseFloat(editedProduct.price),
              description: editedProduct.description,
              image: editedProduct.image,
              category: editedProduct.category,
            }
          : p
      )
    );
    setEditingProductId(null);
  };
  const handleEditCancel = () => setEditingProductId(null);

  const renderMainContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="p-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-sm text-accent-light mb-2">Total Orders</h3>
                <p className="text-3xl font-semibold text-primary-dark">
                  {totalOrders}
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-sm text-accent-light mb-2">Total Sales</h3>
                <p className="text-3xl font-semibold text-primary-dark">
                  $ {totalSales.toFixed(2)}
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-sm text-accent-light mb-2">Total Items</h3>
                <p className="text-3xl font-semibold text-primary-dark">
                  {totalItems}
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-sm text-accent-light mb-2">
                  Pending Orders
                </h3>
                <p className="text-3xl font-semibold text-primary-dark">
                  {pendingOrders}
                </p>
              </div>
            </div>

            {/* Recent Orders and Top Selling Products */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-accent-light">
                  Recent orders
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your latest customer orders
                </p>
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="mb-3 p-4 bg-nav-background rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-accent-light rounded-full"></span>
                          <span className="text-nav-link font-medium">
                            ORD - {order.id}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent-light font-semibold">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="bg-button-fill text-accent-light text-sm px-2 py-1 rounded">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-accent-light">
                  Top Selling Product
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your best performing products this month
                </p>
                {topSellingProducts.map((product) => (
                  <div
                    key={product.id}
                    className="mb-3 p-4 bg-nav-background rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-nav-link font-medium">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-accent-light font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="bg-button-fill text-accent-light text-sm px-2 py-1 rounded">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Total Orders":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-accent-light mb-2">
              Total Orders List
            </h2>
            <p className="text-lg text-gray-500 mb-4">Your customer orders</p>
            <table className="w-full bg-surface rounded-lg">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Furniture Item</th>
                  <th className="px-4 py-2 text-left">Customer Email</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-3 text-nav-link">
                      ORD - {order.id}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-nav-link">
                      {order.items?.[0]?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-nav-link">
                      {order.userEmail}
                    </td>
                    <td className="px-4 py-3">$ {order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === "Pending"
                            ? "bg-button-fill text-accent-light"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Total Sales":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-accent-light mb-2">
                Total Sales
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-lg text-gray-500">Your total sales</p>
                <div className="bg-yellow-100 px-4 py-1 rounded">
                  <span className="font-semibold text-accent-light">
                    $ {totalSales.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <table className="w-full bg-surface rounded-lg">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Furniture Item</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-nav-link">
                      {order.items?.[0]?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-accent-light">
                      $ {order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Total Items":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-accent-light mb-2">
                Total Item
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-lg text-gray-500">Your Total Items</p>
                <div className="bg-yellow-100 px-4 py-1 rounded">
                  <span className="font-semibold text-accent-light">
                    {totalItems}
                  </span>
                </div>
              </div>
            </div>
            <table className="w-full bg-surface rounded-lg">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="px-4 py-2 text-left">Item ID</th>
                  <th className="px-4 py-2 text-left">Furniture Item Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-3 text-nav-link">
                      Item{product.id}
                    </td>
                    <td className="px-4 py-3 text-nav-link">{product.name}</td>
                    <td className="px-4 py-3 text-nav-link">
                      $ {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-nav-link">14/20</td>
                    <td className="px-4 py-3">
                      <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded hover:bg-orange-200">
                        Delete Item
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Pending Orders":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-accent-light mb-2">
                Pending Orders
              </h2>
              <p className="text-lg text-gray-500">Your total pending Orders</p>
            </div>
            <table className="w-full bg-surface rounded-lg">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Furniture Item</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.status === "Pending")
                  .map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-nav-link">
                        ORD - {order.id}
                      </td>
                      <td className="px-4 py-3 text-nav-link">
                        {order.items?.[0]?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-nav-link">
                        $ {order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-nav-background p-6">
        <nav>
          <button
            onClick={() => setActiveSection("Dashboard")}
            className={`w-full text-left mb-2 p-2 rounded ${
              activeSection === "Dashboard"
                ? "bg-accent-light text-surface"
                : "bg-[#F9940A] text-white opacity-50 hover:opacity-75"
            }`}
          >
            Dashboard
          </button>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-primary-dark mb-2">
              Shop Management
            </h3>
            <button
              onClick={() => setActiveSection("Total Orders")}
              className={`w-full text-left mb-2 p-2 rounded ${
                activeSection === "Total Orders"
                  ? "bg-accent-light text-surface"
                  : "bg-[#F9940A] text-white opacity-50 hover:opacity-75"
              }`}
            >
              Total Orders
            </button>
            <button
              onClick={() => setActiveSection("Total Sales")}
              className={`w-full text-left mb-2 p-2 rounded ${
                activeSection === "Total Sales"
                  ? "bg-accent-light text-surface"
                  : "bg-[#F9940A] text-white opacity-50 hover:opacity-75"
              }`}
            >
              Total Sales
            </button>
            <button
              onClick={() => setActiveSection("Total Items")}
              className={`w-full text-left mb-2 p-2 rounded ${
                activeSection === "Total Items"
                  ? "bg-accent-light text-surface"
                  : "bg-[#F9940A] text-white opacity-50 hover:opacity-75"
              }`}
            >
              Total Items
            </button>
            <button
              onClick={() => setActiveSection("Pending Orders")}
              className={`w-full text-left mb-2 p-2 rounded ${
                activeSection === "Pending Orders"
                  ? "bg-accent-light text-surface"
                  : "bg-[#F9940A] text-white opacity-50 hover:opacity-75"
              }`}
            >
              Pending Orders
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-surface p-6">
          <h1 className="text-2xl font-semibold text-accent-light text-center">
            Admin Dashboard
          </h1>
        </header>
        {renderMainContent()}
      </div>
    </div>
  );
}
