import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // No filters on this simple table view

  return (
    <div className="min-h-screen bg-background font-montserrat py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-primary-900" />
          </button>
          <h1 className="text-3xl font-semibold text-primary-900 text-center flex-1">
            Favourites
          </h1>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-primary-600 mb-4">No favorites added yet.</p>
            <Link
              to="/"
              className="px-6 py-3 bg-accent-light text-nav-link rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <tbody>
              {favorites.map((item) => (
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
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
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
