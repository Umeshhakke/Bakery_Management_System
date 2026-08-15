import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";

function OrderSummary({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            🥐
          </div>

          <div>
            <h1>Sweet Crust</h1>
            <p>Your selected treats</p>
          </div>

        </div>

        {/* BACK TO MENU */}
        <Link to="/" className="back-button">
          ← Back to Menu
        </Link>

      </header>


      {/* ORDER SUMMARY */}
      <main className="order-page">

        <div className="order-card">

          <div className="order-title">

            <span>YOUR ORDER</span>

            <h2>
              🛒 Order Summary
            </h2>

          </div>


          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />


          {/* CONTINUE BUTTON */}

          {cart.length > 0 && (
            <button
              className="continue-order-button"
              onClick={() => navigate("/order-details")}
            >
              Continue to Order Details →
            </button>
          )}

        </div>

      </main>

    </div>
  );
}

export default OrderSummary;