import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getRequestHeader , API_URL} from "../utils/api"

function Profile() {
  // Get logged-in user's details
  const [user , setUser] = useState("");
  const [loading , setLoading] = useState(true);
  const[error , setError] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUserData =async ()=>{
      const token = localStorage.getItem('token');
      if(!token){
        setError("Please Login First");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/profile`, {method:"GET" , headers:getRequestHeader(false)} );
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || 'Authorization Failed');
      }

      setUser(data.user);
      setLoading(false);
    };
    fetchUserData();
  },[]);

  // Temporary order history
  // This will later come from the backend.
  const orders = [
  ];

  return (
    <div className="profile-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            🥐
          </div>

          <div>
            <h1>Sweet Crust</h1>
            <p>Your profile & orders</p>
          </div>

        </div>

        <Link to="/menu" className="back-button">
          <button className="edit-profile-button">Back to Menu</button>
        </Link>

      </header>


      {/* =========================
          PROFILE CONTENT
      ========================= */}

      <main className="profile-container">

        {/* PAGE HEADING */}

        <div className="profile-heading">

          <span>MY ACCOUNT</span>

          <h2>
            My Profile
          </h2>

          <p>
            Manage your personal details and view your order history.
          </p>

        </div>


        {/* =========================
            USER INFORMATION
        ========================= */}

        <section className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <div className="profile-details">

            <div className="profile-name-row">

              <div>

                <h3>
                  {user?.name || "Guest User"}
                </h3>

                <p className="profile-email">
                  {user?.email || "No email available"}
                </p>

              </div>

              <button
                className="edit-profile-button"
                type="button"
                onClick={() =>
                  alert(
                    "Edit profile will be connected with the backend later."
                  )
                }
              >
                ✏️ Edit Profile
              </button>

            </div>


            {/* USER DETAILS */}

            <div className="profile-info-grid">

              <div className="profile-info-item">

                <span>
                  📧 Email Address
                </span>

                <strong>
                  {user?.email || "Not available"}
                </strong>

              </div>


              <div className="profile-info-item">

                <span>
                  📞 Phone Number
                </span>

                <strong>
                  {user?.phone
                    ? `+91 ${user?.phone}`
                    : "Not available"}
                </strong>

              </div>


              <div className="profile-info-item profile-address">

                <span>
                  📍 Delivery Address
                </span>

                <strong>
                  {user.address || "Address not added yet"}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            ORDER HISTORY
        ========================= */}

        <section className="orders-section">

          <div className="orders-heading">

            <div>

              <span>
                YOUR ORDERS
              </span>

              <h2>
                Order History
              </h2>

            </div>

            <div className="order-count">
              {orders.length} Orders
            </div>

          </div>


          <div className="orders-list">

            {orders.length === 0 ? (

              <div className="no-orders">

                <div className="no-orders-icon">
                  🛒
                </div>

                <h3>
                  No orders yet
                </h3>

                <p>
                  Your completed orders will appear here.
                </p>

                <Link
                  to="/menu"
                  className="shop-button"
                >
                  Start Shopping
                </Link>

              </div>

            ) : (

              orders.map((order) => (

                <div
                  className="order-history-card"
                  key={order.id}
                >

                  {/* LEFT SIDE */}

                  <div className="order-history-main">

                    <div className="order-icon">
                      📦
                    </div>

                    <div className="order-information">

                      <div className="order-id-row">

                        <h3>
                          {order.id}
                        </h3>

                        <span className="order-status">
                          {order.status}
                        </span>

                      </div>

                      <p className="order-date">
                        Ordered on {order.date}
                      </p>

                      <p className="order-items">
                        {order.items}
                      </p>

                    </div>

                  </div>


                  {/* RIGHT SIDE */}

                  <div className="order-history-right">

                    <div className="profile-order-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        ₹{order.total}
                      </strong>

                    </div>


                    <button
                      type="button"
                      className="view-order-button"
                      onClick={() =>
                        alert(
                          `Order details for ${order.id} will be connected later.`
                        )
                      }
                    >
                      View Order
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;