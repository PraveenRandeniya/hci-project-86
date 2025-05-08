import { useState } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { StarIcon } from "@heroicons/react/24/solid";

export default function Categories() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // derive unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // filter state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // compute data min/max for price slider
  const prices = products.map((p) => p.price);
  const dataMin = Math.min(...prices);
  const dataMax = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([dataMin, dataMax]);

  // apply all three filters
  const filtered = products.filter((item) => {
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
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
          } md:block w-64 bg-white rounded-lg shadow p-4 space-y-6 fixed inset-y-0 left-0 md:relative z-50`}
        >
          {/* Mobile close button */}
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2">
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          {/* Price Range */}
          <h2 className="text-lg font-medium">Price Range</h2>
          <div>
            <input
              type="range"
              min={dataMin}
              max={dataMax}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([dataMin, Number(e.target.value)])}
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-yellow-600">${dataMin.toFixed(0)}</span>
              <span className="text-yellow-600">${priceRange[1]}</span>
            </div>
          </div>

          {/* Search box */}
          <div>
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-yellow-100 pl-4 pr-4 py-1 text-sm"
            />
          </div>

          {/* Category bullets */}
          <div>
            <h2 className="text-lg font-medium mb-2">Categories</h2>
            <ul className="space-y-2">
              {/* "All" option */}
              <li
                className={`flex items-center cursor-pointer ${
                  categoryFilter === "all" ? "text-accent-600" : "text-gray-700"
                }`}
                onClick={() => setCategoryFilter("all")}
              >
                <span className="h-2 w-2 bg-accent-600 rounded-full mr-2" />
                All
              </li>

              {categories.map((category) => (
                <li
                  key={category}
                  className={`flex items-center cursor-pointer capitalize ${
                    categoryFilter === category
                      ? "text-accent-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  <span className="h-2 w-2 bg-accent-600 rounded-full mr-2" />
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* → PRODUCTS GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-surface rounded-lg shadow-md overflow-hidden flex flex-col h-full"
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
                  <button className="mt-auto px-4 py-2 bg-accent-light text-nav-link font-medium rounded hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
