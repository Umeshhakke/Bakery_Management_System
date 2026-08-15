function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>

        <h3>Your cart is empty</h3>

        <p>
          Add something delicious from our menu.
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">

      <div className="cart-items">

        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
          >

            {/* PRODUCT */}
            <div className="cart-product">

              <div className="cart-product-icon">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="cart-product-details">

                <h4>
                  {item.name}
                </h4>

                <p>
                  ₹{item.price} each
                </p>

              </div>

            </div>


            {/* QUANTITY */}
            <div className="quantity-controls">

              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>

            </div>


            {/* SUBTOTAL */}
            <div className="cart-subtotal">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{(item.price * item.quantity).toFixed(2)}
              </strong>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Cart;