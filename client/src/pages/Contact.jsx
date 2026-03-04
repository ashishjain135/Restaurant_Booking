import React from "react";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-3">
          We'd love to hear from you. Get in touch with us!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="space-y-6">

          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
            <p className="text-gray-600">
              123 Food Street, Downtown <br/>
              Sagar, Madhya Pradesh, India
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-600">
              +91 98765 43210
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">✉ Email</h3>
            <p className="text-gray-600">
              MealAdda@restaurant.com
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            Send us a Message
          </h3>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* Map Section */}
      <div className="mt-16">

        <h3 className="text-2xl font-semibold mb-6 text-center">
          Find Us on Map
        </h3>

        <iframe
          title="restaurant-map"
          src="https://www.google.com/maps?q=Sagar,Madhya%20Pradesh&output=embed"
          className="w-full h-[400px] rounded-xl border"
          loading="lazy"
        ></iframe>

      </div>

    </div>
  );
}

export default Contact;