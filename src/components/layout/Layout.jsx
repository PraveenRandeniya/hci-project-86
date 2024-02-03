import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import { useAppContext } from "../../context/AppContext";
import {
  ShoppingCartIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { cart, favorites, user, logout, isAdmin } = useAppContext();
  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };
  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };
  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  // Close the user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface shadow-nav shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo placeholder */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/images/eloma.png"
                  alt="Elmora Logo"
                  className="h-24 w-auto"
                />
              </Link>
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-montserrat font-medium text-[15px] leading-[18px] uppercase ${
                    location.pathname === item.href
                      ? "text-accent-light"
                      : "text-nav-link hover:opacity-80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop icons and auth buttons */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 relative">
              <Link
                to="/favorites"
                className="relative text-gray-700 hover:text-black"
              >
                <HeartIcon className="h-6 w-6 text-black hover:text-accent-light" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-light text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-black"
              >
                <ShoppingCartIcon className="h-6 w-6 text-black hover:text-accent-light" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-light text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="font-montserrat font-medium text-[15px] leading-[18px] px-4 py-2 bg-nav-background border border-nav-link text-nav-link rounded hover:opacity-80 transition"
                  >
                    {user.name}
                  </button>
                  {isUserMenuOpen && (
                    <div
                      ref={userMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openLoginModal()}
                    className="font-montserrat font-medium text-[15px] leading-[18px] px-4 py-2 bg-nav-background border border-nav-link text-nav-link rounded hover:opacity-80 transition"
                  >
                    Log in
                  </button>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openSignupModal();
                    }}
                    className="font-montserrat font-medium text-[15px] leading-[18px] px-4 py-2 bg-accent-light text-nav-link rounded hover:opacity-90 transition-opacity transition"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile slide-out */}
          {isMenuOpen && (
            <div className="lg:hidden mt-2 border-t border-primary-dark pt-2">
              <div className="flex items-center px-3 space-x-4 mb-2">
                <Link
                  to="/favorites"
                  className="relative text-gray-700 hover:text-primary-dark"
                >
                  <HeartIcon className="h-6 w-6 text-black" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-light text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-primary-dark"
                >
                  <ShoppingCartIcon className="h-6 w-6 text-black" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-light text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-montserrat font-medium text-[15px] leading-[18px] uppercase text-nav-link hover:opacity-80 px-3 py-2"
                >
                  {item.name}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  openLoginModal();
                  setIsMenuOpen(false);
                }}
                className="block font-montserrat font-medium text-[15px] leading-[18px] mt-2 px-3 py-2 bg-nav-background border border-nav-link text-nav-link rounded hover:opacity-80 transition"
              >
                Log in
              </button>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  openSignupModal();
                  setIsMenuOpen(false);
                }}
                className="block font-montserrat font-medium text-[15px] leading-[18px] mb-2 px-3 py-2 bg-accent-light text-nav-link rounded hover:opacity-90 transition-opacity transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Login / Signup Modals */}
      {showLoginModal && (
        <Login onClose={closeModals} openSignup={openSignupModal} />
      )}
      {showSignupModal && (
        <SignUp onClose={closeModals} openLogin={openLoginModal} />
      )}

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#F6E0C4] text-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:underline">
                  Help &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-sm space-y-1">
              FurniQube HOUSE
              <br />
              49 Featherstone Street
              <br />
              LONDON
              <br />
              EC1Y 8RT
              <br />
              UNITED KINGDOM
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sign Up Now</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-accent-light py-2 px-1 focus:outline-none placeholder:text-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-accent-light py-2 px-1 focus:outline-none placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="w-full bg-accent-light text-nav-link font-medium py-3 uppercase tracking-wide"
              >
                SIGN UP NOW
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-300 text-left text-sm text-gray-600">
          <p>© 2025 Designed by LayathmaPrathirana</p>
        </div>
      </footer>
    </div>
  );
}
