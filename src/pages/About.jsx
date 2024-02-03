import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-montserrat">
      {/* Hero Section with Background */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/aboutback.png")',
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="container mx-auto px-4 py-12 relative">
          <div className="bg-white/95 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src="/images/about-hero.png"
                  alt="Modern furniture showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
                  About Us
                </h1>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We are passionate about helping you create a beautiful,
                    functional, and comfortable living space with our
                    high-quality modern furniture pieces. Our mission is to
                    guide, inspire and empower you to design a home that
                    reflects your unique style and personality.
                  </p>
                  <p className="text-gray-700">
                    Founded in 2023, Home's has quickly grown from a small idea
                    into a trusted destination for homeowners, interior
                    designers, and businesses looking for high-end furniture
                    solutions. What started as a modest collection of curated
                    essential items has blossomed into a full collection that
                    spans living rooms, bedrooms, dining areas, home offices,
                    and outdoor spaces.
                  </p>
                  <p className="text-gray-700">
                    At Home Store Name, we believe that great furniture does
                    more than fill a room — it transforms it. Every piece we
                    offer is thoughtfully curated to fit seamlessly into your
                    lifestyle. From luxurious sofas and elegant dining tables to
                    cozy beds and versatile storage solutions, our collections
                    are crafted to blend beauty with everyday practicality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/quality.png"
                alt="Premium Quality"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We source the finest materials and work with skilled artisans to
                deliver furniture that lasts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/design.png"
                alt="Modern Designs"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Modern Designs</h3>
              <p className="text-gray-600">
                We stay ahead of the trends, offering you pieces that are
                stylish yet timeless.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="/images/affordable.png"
                alt="Affordable Luxury"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Affordable Luxury</h3>
              <p className="text-gray-600">
                We believe everyone deserves a beautiful home, so we offer
                high-end furniture at fair, accessible prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
