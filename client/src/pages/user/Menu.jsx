import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

function Menu() {

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await API.get("/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h2 className="text-3xl font-bold text-center mb-10">
        🍽 Our Menu
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {menuItems.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            <img
              src={item.image}
              alt={item.dishName}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h3 className="text-xl font-semibold">
                {item.dishName}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.description}
              </p>

              <div className="flex justify-between mt-3">

                <span className="text-yellow-600 font-bold">
                  ₹{item.price}
                </span>

                {item.isTodaySpecial && (
                  <span className="text-sm bg-yellow-200 px-2 py-1 rounded">
                    ⭐ Special
                  </span>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Menu;