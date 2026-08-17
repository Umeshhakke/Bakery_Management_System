import { API_URL } from "../utils/api";
import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

function Menu({ addToCart, searchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        // Map db products to match front-end structure
        const formattedProducts = data.map((item) => ({
          id: item._id, // Use _id from MongoDB as id
          name: item.name,
          category: item.category || "Cakes",
          price: item.price,
          image: item.image || "https://via.placeholder.com/150",
          quantity: item.quantity,
          unit: item.unit || "1 pc"
        }));
        setDbProducts(formattedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const categories = [
    "All",
    "Cakes",
    "Biscuits",
    "Khari",
    "Breads & Buns",
    "Others"
  ];

  const filteredItems = dbProducts.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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