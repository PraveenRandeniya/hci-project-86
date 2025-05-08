import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function AdminDashboard() {
  const { products, setProducts, orders, updateOrderStatus } = useAppContext();
  const [activeTab, setActiveTab] = useState("products");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: Date.now().toString(),
      price: parseFloat(newProduct.price),
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-end">
        <h1 className="text-3xl font-bold text-primary-900">Admin Dashboard</h1>
      </div>
      <div className="flex space-x-6">
        {/* Sidebar */}
        <aside className="w-48 bg-primary-50 border border-gray-200 rounded-lg p-4 space-y-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "products"
                ? "bg-accent-100 text-accent-700"
                : "text-primary-700 hover:bg-gray-100"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "orders"
                ? "bg-accent-100 text-accent-700"
                : "text-primary-700 hover:bg-gray-100"
            }`}
          >
            Orders
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
          {activeTab === "products" && (
            <section className="space-y-8">
              {/* Add New Product Form */}
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">
                  Add New Product
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                  <textarea
                    rows={3}
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 bg-accent-600 text-white px-4 py-2 rounded hover:bg-accent-700 transition"
                >
                  Add Product
                </button>
              </div>

              {/* Existing Products Grid */}
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">
                  Existing Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="h-40 bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image || product.images?.[0]}
                          alt={product.name}
                          className="h-full object-contain"
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <p className="font-semibold text-primary-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-primary-600 text-sm">
                          {product.category}
                        </p>
                        <p className="text-primary-700 font-medium">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-4 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">
                Orders Management
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="bg-primary-50 p-4 flex justify-between items-center border-b border-gray-100">
                      <span className="text-primary-900 font-medium">
                        Order #{order.id}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-sm text-primary-600">
                        Customer: {order.userEmail}
                      </p>
                      <p className="text-sm text-primary-600">
                        Date: {formattedDate(order.date)}
                      </p>
                      <p className="font-semibold text-primary-900">
                        Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                    {order.status === "Pending" && (
                      <div className="p-4 border-t border-gray-100 flex justify-end space-x-4">
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Completed")
                          }
                          className="text-green-600 hover:text-green-800"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Cancelled")
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
