import { useState } from "react";
import { getRequestHeader, API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { getRequestHeader, API_URL } from "../utils/api";

import "../styles/Order.css";


function Order({ cart, clearCart }) {

  const navigate = useNavigate();


  // =========================================================
  // FORM STATE
  // =========================================================
  
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(savedUser.name || "");
  const [phone, setPhone] = useState(savedUser.phone || "");
  const [address, setAddress] = useState(savedUser.address || "");


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


  // =========================================================
  // SUBMIT ORDER
  // =========================================================

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    navigate("/menu");
    return;
  }

  if (!name.trim() || !phone || !address.trim()) {
    alert("Please fill all delivery details.");
    return;
  }

  if (phone.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const orderData = {
    customer: {
      name: name.trim(),
      phone: phone,
      address: address.trim(),
    },

    items: cart.map((item) => ({
      itemId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),

    total: total,
  };

  try {
    console.log("Sending order:", orderData);

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: getRequestHeader(true),
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    console.log("Backend response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }


    // Required fields
    if (!name.trim() || !phone || !address.trim()) {

      alert(
        "Please fill all delivery details."
      );

      return;
    }


    // Phone validation
    if (phone.length !== 10) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }


    // =======================================================
    // ORDER DATA
    // =======================================================

    const orderData = {

      customer: {

        name: name.trim(),

        phone: phone,

        address: address.trim(),

      },


      items: cart.map((item) => ({

        itemId: item.id,

        name: item.name,

        quantity: item.quantity,

        price: item.price,

      })),


      total: total,

    };


    // =======================================================
    // SEND TO API
    // =======================================================
    
    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: getRequestHeader(true),
      body: JSON.stringify(orderData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to place order.");
        return res.json();
      })
      .then(data => {
        alert("Order placed successfully! 🎉");
        if (clearCart) clearCart();
        navigate("/menu");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to place order.");
      });
  };


  return (

    <div className="order-details-page">


      {/* =====================================================
          COMMON HEADER
      ====================================================== */}

      <Header cartCount={cartCount} />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="order-details-container">


        {/* ===================================================
            PAGE HEADING
        ==================================================== */}

        <section className="order-details-heading">

          <div>

            <span>
              ORDER DETAILS
            </span>

            <h1>
              Complete Your Order
            </h1>

            <p>
              Just a few details and your favourite treats
              will be ready.
            </p>

          </div>


          <button
            className="back-cart-button"
            onClick={() => navigate("/order")}
          >
            ← Back to Cart
          </button>

        </section>


        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="order-content">


          {/* =================================================
              CUSTOMER DETAILS
          ================================================== */}

          <section className="customer-card">

            <div className="card-heading">

              <div className="card-heading-icon">
                👤
              </div>

              <div>

                <h2>
                  Customer Details
                </h2>

                <p>
                  Enter your delivery information
                </p>

              </div>

            </div>


            <form onSubmit={handleSubmit}>


              {/* FULL NAME */}

              <div className="order-input-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              {/* PHONE */}

              <div className="order-input-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

              </div>


              {/* ADDRESS */}

              <div className="order-input-group">

                <label htmlFor="address">
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  placeholder="Enter your complete delivery address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  rows={4}
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-order-button"
              >

                <span>
                  Place Order
                </span>

                <span className="submit-arrow">
                  →
                </span>

              </button>

            </form>

          </section>


          {/* =================================================
              ORDER SUMMARY
          ================================================== */}

          <section className="order-items-card">


            <div className="card-heading">

              <div className="card-heading-icon">
                🛒
              </div>

              <div>

                <h2>
                  Your Order
                </h2>

                <p>
                  {cartCount} item
                  {cartCount !== 1 ? "s" : ""}
                </p>

              </div>

            </div>


            {/* =================================================
                EMPTY CART
            ================================================== */}

            {cart.length === 0 ? (

              <div className="order-empty">

                <div className="empty-cart-icon">
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some delicious treats before
                  placing your order.
                </p>

                <button
                  onClick={() =>
                    navigate("/menu")
                  }
                >
                  Browse Menu
                </button>

              </div>

            ) : (

              <>

                {/* =================================================
                    PRODUCTS
                ================================================== */}

                <div className="order-products">

                  {cart.map((item) => (

                    <div
                      className="order-product"
                      key={item.id}
                    >


                      {/* IMAGE */}

                      <div className="order-product-image-wrapper">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="order-product-image"
                        />

                      </div>


                      {/* PRODUCT INFO */}

                      <div className="order-product-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹{item.price} ×{" "}
                          {item.quantity}
                        </p>

                      </div>


                      {/* ITEM TOTAL */}

                      <strong className="order-product-total">

                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}

                      </strong>

                    </div>

                  ))}

                </div>


                {/* =================================================
                    TOTAL
                ================================================== */}

                <div className="order-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{total.toFixed(2)}
                  </strong>

                </div>

              </>

            )}

          </section>

        </div>

      </main>

    </div>

  );
}

export default Order;