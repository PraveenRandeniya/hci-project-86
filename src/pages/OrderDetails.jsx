import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const { user, getOrderById } = useAppContext();
  const navigate = useNavigate();
  const order = getOrderById(id);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background font-montserrat py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Order Not Found
          </h1>
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-montserrat py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-primary-900">
              Order #{order.id}
            </h1>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Information</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Shipped"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> $
                  {order.total.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">
                Shipping Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.shippingAddress}
                </p>
                {order.trackingNumber && (
                  <p>
                    <span className="font-medium">Tracking Number:</span>{" "}
                    {order.trackingNumber}
                  </p>
                )}
                {order.estimatedDelivery && (
                  <p>
                    <span className="font-medium">Estimated Delivery:</span>{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            {item.color && (
                              <div className="text-sm text-gray-500">
                                Color: {item.color}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                    >
                      Total
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            {order.status === "Pending" && (
              <button
                onClick={() => {
                  // Handle cancel order
                  navigate("/dashboard");
                }}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
              >
                Cancel Order
              </button>
            )}
            {(order.status === "Processing" || order.status === "Shipped") && (
              <Link
                to={`/track-order/${order.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Track Order
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
