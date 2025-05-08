import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, categories } from "../data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function CategoryPage() {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("featured");

  const categoryInfo = categories.find((c) => c.id === category);
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => product.category === category);

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [category, priceRange, sortBy]);

  if (!categoryInfo) {
    return <div className="text-center py-12">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top header removed – using Category Info Section for name & description */}

        {/* Top product slider */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={16}
          navigation
          className="mb-12"
        >
          {filteredProducts.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <Link to={`/product/${product.id}`} className="block text-center">
                <div className="border border-primary-900 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <p className="mt-2 font-serif text-sm text-primary-900 truncate">
                  {product.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Category Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary-900 uppercase mb-4">
              {categoryInfo.name}
            </h2>
            <p className="text-primary-600 leading-relaxed">
              {categoryInfo.info}
            </p>
          </div>
          <div>
            <img
              src={categoryInfo.image}
              alt={categoryInfo.name}
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Filter & Sort Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-primary-600 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            {/* Price Range */}
            <div>
              <label className="block text-primary-600 mb-2">Price Range</label>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="input-field w-24 border rounded px-2 py-1"
                  min="0"
                  max={priceRange[1]}
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="input-field w-24 border rounded px-2 py-1"
                  min={priceRange[0]}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block transform hover:scale-105 transition-shadow duration-300"
                >
                  <div className="relative border border-primary-900 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-contain"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300"></div>
                    {/* Details panel */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90">
                      <p className="font-serif font-semibold text-lg text-primary-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-primary-600 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-primary-500">
                No products found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
