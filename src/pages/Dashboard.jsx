import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAdmin, getUserOrders, updateOrderStatus } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, navigate]);

  // If not logged in or is admin, don't render anything
  if (!user || isAdmin) {
    return null;
  }

  const orders = getUserOrders();

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-background font-montserrat py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-primary-900 text-center mb-6">
          Orders
        </h1>

        {orders.length === 0 ? (
          <div className="max-w-md mx-auto bg-white border border-primary-900 rounded-lg p-8 shadow-md text-center">
            <p className="text-primary-600 mb-4">
              No orders yet. Start shopping to place your first order!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Order #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/order/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </Link>
                      {order.status === "Pending" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "Cancelled")
                          }
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md border border-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                      {(order.status === "Processing" ||
                        order.status === "Shipped") && (
                        <Link
                          to={`/track-order/${order.id}`}
                          className="text-green-600 hover:text-green-800 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50"
                        >
                          Track Order
                        </Link>
                      )}
                      {order.status === "Delivered" && (
                        <Link
                          to={`/review/${order.id}`}
                          className="text-purple-600 hover:text-purple-800 px-3 py-1 rounded-md border border-purple-600 hover:bg-purple-50"
                        >
                          Write Review
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
