function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Empty cart
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

      {/* CART ITEMS */}
      <div className="cart-items">

        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
          >

            {/* PRODUCT INFO */}
            <div className="cart-product">

              <div className="cart-product-icon">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div>
                <h4>{item.name}</h4>

                <p>
                  ₹{item.price} each
                </p>
              </div>

            </div>


            {/* QUANTITY */}
            <div className="quantity-controls">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                −
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
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
                ₹{item.price * item.quantity}
              </strong>

            </div>

          </div>
        ))}

      </div>


      {/* TOTAL */}
      <div className="cart-total">

        <div className="total-label">
          <span>Total Amount</span>

          <strong>
            ₹{total}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default Cart;