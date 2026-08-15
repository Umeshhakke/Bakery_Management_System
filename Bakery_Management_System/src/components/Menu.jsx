import { useState } from "react";
import bakeryItems from "../data/bakeryData";
import MenuItem from "./MenuItem";

function Menu({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cakes",
    "Biscuits",
    "Khari",
    "Breads & Buns",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? bakeryItems
      : bakeryItems.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div>

      {/* CATEGORY FILTER */}
      <div className="category-filter">

        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}

      </div>


      {/* MENU PRODUCTS */}
      <div className="menu-grid">

        {filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            addToCart={addToCart}
          />
        ))}

      </div>

    </div>
  );
}

export default Menu;