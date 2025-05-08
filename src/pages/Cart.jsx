import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function Cart() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    user,
    placeOrder,
  } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) removeFromCart(id);
    else updateCartQuantity(id, qty);
  };

  const handleCheckout = () => {
    if (!user) return navigate("/");
    setIsCheckingOut(true);
    const success = placeOrder();
    setIsCheckingOut(false);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-background font-montserrat py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-primary-900 text-center mb-6">
          Cart
        </h1>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-primary-600 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="px-6 py-3 bg-accent-light text-nav-link rounded-lg hover:bg-accent-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b last:border-none">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-12 w-12 object-contain"
                        />
                        <span className="text-primary-900 font-medium truncate">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <MinusIcon className="h-4 w-4 text-primary-600" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <PlusIcon className="h-4 w-4 text-primary-600" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-end items-center space-x-6">
              <div className="text-lg font-medium text-primary-900">
                Total: ${cartTotal.toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="px-5 py-3 bg-accent-light text-nav-link font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
