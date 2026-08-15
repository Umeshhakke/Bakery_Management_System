import { useNavigate } from "react-router-dom";

import Cart from "../components/Cart";
import Header from "../components/Header";

import "../styles/OrderSummary.css";


function OrderSummary({
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {

  const navigate = useNavigate();


  // =========================================================
  // CART COUNT
  // =========================================================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  // =========================================================
  // TOTAL
  // =========================================================

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  return (

    <div className="order-summary-page">


      {/* =====================================================
          COMMON HEADER
      ====================================================== */}

      <Header cartCount={cartCount} />


      {/* =====================================================
          ORDER CONTENT
      ====================================================== */}

      <main className="order-page">


        {/* ===================================================
            PAGE HEADING
        ==================================================== */}

        <div className="order-page-heading">

          <div>

            <span>
              YOUR ORDER
            </span>

            <h1>
              Order Summary
            </h1>

            <p>
              Review your selected treats before continuing.
            </p>

          </div>


          <button
            className="back-menu-button"
            onClick={() => navigate("/menu")}
          >
             Back to Menu
          </button>

        </div>


        {/* ===================================================
            ORDER CARD
        ==================================================== */}

        <section className="order-card">


          {/* CART */}

          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />


          {/* =================================================
              ORDER FOOTER
          ================================================== */}

          {cart.length > 0 && (

            <div className="order-footer">


              <div className="order-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{total.toFixed(2)}
                </strong>

              </div>


              <button
                className="continue-order-button"
                onClick={() =>
                  navigate("/order-details")
                }
              >
                Continue to Order Details
                <span>→</span>
              </button>

            </div>

          )}

        </section>


      </main>

    </div>

  );
}

export default OrderSummary;