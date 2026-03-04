import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          About Our Restaurant
        </h1>
        <p className="text-gray-500 mt-3">
          Experience delicious food and warm hospitality
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

        <img
          src="https://media.istockphoto.com/id/1446478827/photo/a-chef-is-cooking-in-his-restaurants-kitchen.jpg?s=612x612&w=0&k=20&c=jwKJmGErrLe2XsTWNYEEyiNicudYVA4j8jvnTiJdp58="
          alt="restaurant"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Our Story
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Welcome to our restaurant where passion meets flavor.
            We believe that food is more than just a meal — it is an
            experience. Our chefs carefully craft every dish using
            fresh ingredients and authentic recipes.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Whether you are dining with family, friends, or celebrating
            a special occasion, our restaurant offers a warm and
            inviting atmosphere that makes every moment memorable.
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 text-center">

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-2">
            🍽 Fresh Ingredients
          </h3>
          <p className="text-gray-600">
            We use only the freshest ingredients to ensure quality
            and taste in every dish.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-2">
            👨‍🍳 Expert Chefs
          </h3>
          <p className="text-gray-600">
            Our experienced chefs bring authentic flavors and
            creativity to every plate.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-2">
            ⭐ Great Atmosphere
          </h3>
          <p className="text-gray-600">
            Enjoy your meal in a cozy and welcoming environment
            designed for comfort.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;