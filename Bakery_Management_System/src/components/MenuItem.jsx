function MenuItem({ item, addToCart }) {
  return (
    <div className="menu-card">

      {/* Product Image */}
      <div className="product-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="product-image"
        />

        <span className="category-badge">
          {item.category}
        </span>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <h3 style={{ margin: "0 0 0.2rem" }}>{item.name}</h3>
        <p className="product-unit" style={{ color: "#7f8c8d", fontSize: "0.85rem", margin: "0 0 0.8rem" }}>
          {item.unit || "1 pc"}
        </p>

        <div className="product-bottom">
          <span className="product-price">
            ₹{item.price}
          </span>

          <button onClick={() => addToCart(item)}>
            + Add
          </button>
        </div>
      </div>

    </div>
  );
}

export default MenuItem;