import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = ({ onClose, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login({ email, password });
    if (success) {
      onClose();
      if (email === "admin@example.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => onClose()}
        >
          &times;
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-[35px] font-normal font-['Kadwa'] leading-[42px] text-accent-light mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
            <Link
              to="#"
              className="absolute right-0 top-0 mt-2 mr-2 text-sm text-accent-light"
            >
              forgot password?
            </Link>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-accent-light border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8C00] hover:bg-[#FF7000] text-black font-semibold py-3 rounded-lg transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => openSignup()}
            className="text-accent-light font-semibold"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
