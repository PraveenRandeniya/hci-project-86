import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { products } from "../data/products";
import {
  ShoppingCartIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  StarIcon,
  HeartIcon as OutlineHeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, addToFavorites, removeFromFavorites } =
    useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const product = products.find((p) => p.id === parseInt(id));

  // favorite state for this product
  const isFav = favorites.some((fav) => fav.id === product?.id);
  const toggleFavorite = () => {
    if (!product) return;
    if (isFav) removeFromFavorites(product.id);
    else addToFavorites(product);
  };

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAddingToCart(false), 500); // Reset after animation
  };

  // Build a two-paragraph details array for display
  const details = [
    product.description,
    `${product.name} is crafted from ${product.specs.material}. It measures ${product.specs.dimensions} and weighs ${product.specs.weight}.`,
  ];

  return (
    <div className="bg-[#F6E0C4] py-12 font-montserrat tracking-wide leading-relaxed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image & Long description */}
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                {details.map((para, idx) => (
                  <p key={idx} className="text-sm text-gray-600 mb-3">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            {/* Right: Product info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2 space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-3xl font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Material</h4>
                <p className="text-sm text-gray-600">
                  {product.specs.material}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Dimensions</h4>
                <p className="text-sm text-gray-600">
                  {product.specs.dimensions}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Quantity</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`
                    flex-1 bg-accent-light text-white py-3 rounded
                    flex items-center justify-center gap-2
                    transform transition-all duration-200
                    hover:bg-accent-dark hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isAddingToCart ? "animate-pulse" : ""}
                  `}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={() =>
                    navigate("/room-designer", { state: { product } })
                  }
                  className="flex-1 border border-accent-light text-accent-light py-3 rounded hover:bg-accent-light hover:text-white transition-colors"
                >
                  Try in preview room
                </button>
                {/* Favorite toggle */}
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  {isFav ? (
                    <SolidHeartIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <OutlineHeartIcon className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <TruckIcon className="h-6 w-6 text-accent-light" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-600">
                      On orders over $50. Delivery in 3-5 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowPathIcon className="h-6 w-6 text-accent-light" />
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-sm text-gray-600">
                      Return or exchange within 30 days of purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <ShieldCheckIcon className="h-6 w-6 text-accent-light" />
                  <div>
                    <p className="font-medium">2-Year Warranty</p>
                    <p className="text-sm text-gray-600">
                      All products come with a 2-year warranty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
