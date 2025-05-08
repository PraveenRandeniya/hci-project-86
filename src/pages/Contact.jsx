import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Contact() {
  return (
    <div
      className="min-h-screen bg-background font-montserrat relative"
      style={{
        backgroundImage: 'url("/images/contact_back.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />{" "}
      {/* Overlay for better text readability */}
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg bg-white/90 backdrop-blur-sm">
          {/* Left Image Section */}
          <div className="relative flex items-center justify-center h-full">
            <img
              src="/images/contact_hero_image.png"
              alt="Contact hero image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Contact Info Section */}
          <div className="flex flex-col justify-center p-8">
            <h1 className="text-4xl font-bold text-primary-900 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-700 mb-8">
              At Furniture Super Store, applications are now live running.
              Whenever you are looking to purchase office furniture, you can
              count on us. We have the best in store for you, and we'll help you
              make your space the way you want it to be. We'll help you pick
              your needs, style, fit for the way you live.
            </p>
            <p className="text-gray-700 mb-8">
              Please feel free to send us your questions, comments and messages.
              We will get back to you as soon as possible. You can also call us
              or visit our store. Our customer service representatives are
              eagerly waiting to offer you the best service.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdEmail className="w-6 h-6 text-[#FF8A00]" />
                <span>support@furniturestore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="w-6 h-6 text-[#FF8A00]" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <MdLocationOn className="w-6 h-6 text-[#FF8A00]" />
                <span>123 Elmora St, Springfield, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
