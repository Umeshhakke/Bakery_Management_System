import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Order({ cart }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill all delivery details.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const orderData = {
      customer: {
        name: name,
        phone: phone,
        address: address,
      },

      items: cart.map((item) => ({
        itemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),

      total: total,
    };

    // Temporary: later your friend can connect this to the Java API.
    console.log("ORDER DATA:", orderData);

        alert("Order placed successfully! 🎉");
         navigate("/menu");
  };

  return (
    <div className="order-page">

      <div className="order-container">

        {/* HEADER */}

        <div className="order-header">

          <button
            className="back-button"
            onClick={() => navigate("/order")}
          >
            ← Back to Cart
          </button>

          <span>ORDER DETAILS</span>

          <h1>Complete Your Order</h1>

          <p>
            Just a few details and your favourite treats
            will be ready.
          </p>

        </div>


        <div className="order-content">

          {/* CUSTOMER DETAILS */}

          <div className="customer-card">

            <h2>👤 Customer Details</h2>

            <form onSubmit={handleSubmit}>

              <div className="order-input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>


              <div className="order-input-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  maxLength="10"
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />

              </div>


              <div className="order-input-group">

                <label>Delivery Address</label>

                <textarea
                  placeholder="Enter your complete delivery address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  rows="4"
                />

              </div>


              <button
                type="submit"
                className="submit-order-button"
              >
                Submit Order
                <span>→</span>
              </button>

            </form>

          </div>


          {/* ORDER SUMMARY */}

          <div className="order-items-card">

            <h2>🛒 Your Order</h2>

            {cart.length === 0 ? (

              <div className="order-empty">

                <div>🛒</div>

                <p>Your cart is empty.</p>

                <button
                  onClick={() => navigate("/")}
                >
                  Browse Menu
                </button>

              </div>

            ) : (

              <>

                 {cart.map((item) => (
                 <div className="order-product" key={item.id}>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="order-product-image"
                    />

                    <div className="order-product-info">
                        <h3>{item.name}</h3>
                        <p>
                        ₹{item.price} × {item.quantity}
                        </p>
                    </div>

                    <strong>
                        ₹{item.price * item.quantity}
                    </strong>
                    </div>

                ))}


                <div className="order-total">

                  <span>Total</span>

                  <strong>
                    ₹{total}
                  </strong>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Order;