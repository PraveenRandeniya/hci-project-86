import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SignUp = ({ onClose, openLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Register user
    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      onClose();
      navigate("/dashboard");
    } else {
      setError(result.message);
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
            Create an Account
          </h2>
          <p className="text-sm text-gray-600">Join our community today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div>
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
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm mb-1"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#FFE4C4] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-accent-light border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to{" "}
              <a href="#" className="text-accent-light">
                term and conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8C00] hover:bg-[#FF7000] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => openLogin()}
            className="text-accent-light font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
