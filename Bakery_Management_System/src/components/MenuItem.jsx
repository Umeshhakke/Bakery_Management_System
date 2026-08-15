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
        <h3>{item.name}</h3>

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