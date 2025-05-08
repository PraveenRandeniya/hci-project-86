import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { products } from "../data/products";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

// Top search bar under nav
function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-background shadow-sm py-4">
      <div className="mx-auto px-[0.5vw] sm:px-[1vw] lg:px-[2vw]">
        <form onSubmit={handleSearch} className="relative max-w-sm mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search furniture..."
            className="w-full rounded-full bg-gray-100 pl-4 pr-12 py-2 font-montserrat text-[15px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Hero with static image and overlay text
function HeroSection() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[600px] overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Figma heroFill overlays: base tint then two semitransparent black layers */}
          <div className="absolute inset-0 bg-hero-fill-0" />
          <div className="absolute inset-0 bg-hero-fill-1" />
          <div className="absolute inset-0 bg-hero-fill-2" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="font-montserrat font-semibold text-[48px] leading-[57.6px] text-white">
              Enhance Your House Beauty
              <br />
              With Modern Furniture
            </h1>
            <p className="mt-4 max-w-2xl font-montserrat font-normal text-[24px] leading-[28.8px] text-white">
              Bring warmth and elegance to your interior with our stunning
              modern furniture collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Collection slider by itemType
function CollectionSection() {
  const types = Array.from(new Set(products.map((p) => p.itemType)));
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-montserrat font-medium text-[24px] leading-[28px] uppercase text-center mb-8">
          Collection
        </h2>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 8 },
              640: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 16 },
              1280: { slidesPerView: 5, spaceBetween: 16 },
            }}
            className="overflow-visible w-full"
          >
            {types.map((type) => {
              const prod = products.find((p) => p.itemType === type);
              return (
                <SwiperSlide key={type} className="flex flex-col items-center">
                  <Link
                    to={`/products?type=${encodeURIComponent(type)}`}
                    className="group flex flex-col items-center text-center w-full"
                  >
                    <div className="w-32 h-32 bg-surface rounded-full p-4 shadow-lg mb-4 overflow-hidden transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl group-active:scale-95">
                      <img
                        src={prod.images[0]}
                        alt={type}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="font-montserrat font-medium text-[18px] leading-[22px] capitalize text-gray-800 group-hover:text-accent-light transition-colors">
                      {type}
                    </span>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Custom circular nav buttons */}
          <button className="custom-prev absolute left-6 top-1/2 transform -translate-y-1/2 bg-accent-light hover:bg-accent-dark transition-colors w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg">
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button className="custom-next absolute right-6 top-1/2 transform -translate-y-1/2 bg-accent-light hover:bg-accent-dark transition-colors w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg">
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Best Selling Item section
function FeaturedProducts() {
  // Take first four featured products for best sellers layout
  const featured = products.filter((p) => p.featured).slice(0, 4);
  if (featured.length < 4) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-montserrat font-medium text-[24px] leading-[28px] uppercase text-center mb-8">
          Best Selling Items
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((item) => (
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
    </section>
  );
}

// Contact Us banner section
function ContactSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative h-80 bg-cover bg-center rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/images/contact-us.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 h-full flex items-center justify-start pb-8">
            <div className="text-left pl-20">
              <h2 className="font-montserrat font-bold text-[24px] leading-[28px] uppercase tracking-wide text-white mb-4">
                Transform Your Home
                <br />
                <span className="font-bold ">With Furniture</span>
              </h2>
              <button className="px-4 py-2 font-bold bg-white border border-nav-link text-nav-link font-montserrat font-medium tracking-wide text-[15px] leading-[18px] uppercase rounded hover:opacity-90 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Additional products grid section without heading
function ProductsSection() {
  const showcase = products.filter((p) => p.featured).slice(4, 8);
  if (showcase.length < 1) return null;
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {showcase.map((item) => (
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
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background">
      <SearchBar />
      <HeroSection />
      <CollectionSection />
      <FeaturedProducts />
      <ContactSection />
      <ProductsSection />
    </div>
  );
}
