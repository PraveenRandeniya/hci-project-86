import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { StarIcon } from "@heroicons/react/24/solid";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // derive unique item types
  const types = Array.from(new Set(products.map((p) => p.itemType)));

  // --- Filter state ---
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // compute data min/max for price slider
  const prices = products.map((p) => p.price);
  const dataMin = Math.min(...prices);
  const dataMax = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([dataMin, dataMax]);

  // Set initial filters from URL parameters
  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    const searchFromUrl = searchParams.get("search");

    if (typeFromUrl && types.includes(typeFromUrl)) {
      setTypeFilter(typeFromUrl);
    }

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
      setIsFilterOpen(true); // Show filters on mobile when searching
    }
  }, [searchParams, types]);

  // apply all filters
  const filtered = products.filter((item) => {
    const matchesType = typeFilter === "all" || item.itemType === typeFilter;
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemType.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesType && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6 relative">
        {/* Mobile filter toggle */}
        <div className="md:hidden absolute top-4 left-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 bg-white rounded shadow"
          >
            <FunnelIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* ← FILTER PANEL */}
        <aside
          className={`${
            isFilterOpen ? "block" : "hidden"
          } md:block w-64 bg-white rounded-lg shadow p-4 space-y-6 fixed inset-y-0 left-0 md:relative z-50 md:h-auto overflow-y-auto`}
        >
          {/* Mobile close button */}
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2">
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Search box - Moved to top */}
          <div>
            <h2 className="text-lg font-medium mb-2">Search</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-200 pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-medium mb-2">Categories</h2>
            <ul className="space-y-2">
              {/* "All" option */}
              <li
                className={`flex items-center cursor-pointer transition-colors ${
                  typeFilter === "all"
                    ? "text-accent-600 font-medium"
                    : "text-gray-700 hover:text-accent-600"
                }`}
                onClick={() => setTypeFilter("all")}
              >
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${
                    typeFilter === "all" ? "bg-accent-600" : "bg-gray-400"
                  }`}
                />
                All
              </li>

              {types.map((t) => (
                <li
                  key={t}
                  className={`flex items-center cursor-pointer capitalize transition-colors ${
                    typeFilter === t
                      ? "text-accent-600 font-medium"
                      : "text-gray-700 hover:text-accent-600"
                  }`}
                  onClick={() => setTypeFilter(t)}
                >
                  <span
                    className={`h-2 w-2 rounded-full mr-2 ${
                      typeFilter === t ? "bg-accent-600" : "bg-gray-400"
                    }`}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h2 className="text-lg font-medium mb-2">Price Range</h2>
            <div>
              <input
                type="range"
                min={dataMin}
                max={dataMax}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([dataMin, Number(e.target.value)])
                }
                className="w-full accent-accent-light"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">${dataMin.toFixed(0)}</span>
                <span className="text-gray-600">
                  ${priceRange[1].toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* → PRODUCTS GRID */}
        <div className="flex-1 md:ml-6">
          <div className="flex flex-col mb-6">
            <h1 className="text-2xl font-semibold md:mt-0 mt-12 capitalize">
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : typeFilter === "all"
                ? "All Products"
                : typeFilter}
            </h1>
            <p className="text-gray-600 mt-2">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}{" "}
              found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="bg-surface rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-center font-montserrat font-medium mb-2">
                      {item.name}
                    </p>
                    <div className="flex justify-center mb-2 space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-center text-lg font-semibold mb-4">
                      ${item.price.toFixed(0)}
                    </p>
                    <button
                      className="mt-auto px-4 py-2 bg-accent-light text-nav-link font-medium rounded
                        transform transition-all duration-200
                        hover:bg-accent-dark hover:scale-[1.02]
                        active:scale-[0.98]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setPriceRange([dataMin, dataMax]);
                }}
                className="mt-4 px-4 py-2 bg-accent-light text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
