import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import { getRequestHeader, API_URL } from "../utils/api";

import "../styles/Profile.css";


function Profile() {

  // =========================================================
  // USER STATE
  // =========================================================

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // FETCH USER PROFILE
  // =========================================================

  useEffect(() => {

    const fetchUserData = async () => {

      const token = localStorage.getItem("token");

      // No token
      if (!token) {

        setError("Please Login First");

        setLoading(false);

        return;
      }


      try {

        const response = await fetch(
          `${API_URL}/profile`,
          {
            method: "GET",
            headers: getRequestHeader(false)
          }
        );


        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.message || "Authorization Failed"
          );

        }


        setUser(data.user);

        const ordersRes = await fetch(`${API_URL}/orders/myorders`, {
          method: "GET",
          headers: getRequestHeader(true)
        });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }

      } catch (err) {

        console.error("Profile Error:", err);

        setError(
          err.message || "Unable to load profile"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchUserData();

  }, []);


  // =========================================================
  // TEMPORARY ORDER HISTORY
  // =========================================================

  const [orders, setOrders] = useState([]);


  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", address: "" });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const startEditing = () => {
    setEditForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || ""
    });
    setIsEditing(true);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: getRequestHeader(true),
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsEditing(false);
        const cachedUser = JSON.parse(localStorage.getItem("user")) || {};
        localStorage.setItem("user", JSON.stringify({ ...cachedUser, ...data.user }));
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="profile-page">

        <Header cartCount={0} />

        <div className="profile-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading your profile...
          </p>

        </div>

      </div>
    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (
      <div className="profile-page">

        <Header cartCount={0} />

        <main className="profile-error">

          <div className="error-card">

            <div className="error-icon">
              !
            </div>

            <h2>
              Unable to Load Profile
            </h2>

            <p>
              {error}
            </p>

            <div className="error-actions">

              <Link
                to="/login"
                className="profile-primary-button"
              >
                Login
              </Link>

              <Link
                to="/menu"
                className="profile-secondary-button"
              >
                Back to Menu
              </Link>

            </div>

          </div>

        </main>

      </div>
    );

  }


  return (

    <div className="profile-page">

      {/* =====================================================
          COMMON HEADER
      ====================================================== */}

      <Header cartCount={0} />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="profile-container">


        {/* ===================================================
            PAGE HEADING
        ==================================================== */}

        <section className="profile-heading">

          <div>

            <span className="profile-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information and view your
              order history.
            </p>

          </div>


          <Link
            to="/menu"
            className="back-menu-button"
          >
             Back to Menu
          </Link>

        </section>


        {/* ===================================================
            PROFILE CARD
        ==================================================== */}

        <section className="profile-card">


          {/* AVATAR */}

          <div className="profile-avatar">

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <circle
                cx="12"
                cy="8"
                r="3.5"
              />

              <path
                d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5"
              />

            </svg>

          </div>


          {/* USER DETAILS */}

          <div className="profile-details">


            <div className="profile-name-row">

              <div>

                <h2>
                  {user?.name || "Guest User"}
                </h2>

                <p>
                  {user?.email || "No email available"}
                </p>

              </div>


              <button type="button" className="edit-profile-button" onClick={startEditing}><span>✎</span> Edit Profile</button>

            </div>


            {/* =================================================
                INFORMATION GRID
            ================================================== */}

            <div className="profile-info-grid">


              {/* EMAIL */}

              <div className="profile-info-item">

                <div className="info-icon">

                  <svg viewBox="0 0 24 24">

                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="M3 7l9 6 9-6" />

                  </svg>

                </div>

                <div>

                  <span>
                    Email Address
                  </span>

                  <strong>
                    {user?.email || "Not available"}
                  </strong>

                </div>

              </div>


              {/* PHONE */}

              <div className="profile-info-item">

                <div className="info-icon">

                  <svg viewBox="0 0 24 24">

                    <path
                      d="M6 3h3l2 5-2 1.5c1 2 2.5 3.5 4.5 4.5L15 12l5 2v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 6c0-1.7.3-3 1-3z"
                    />

                  </svg>

                </div>

                <div>

                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {user?.phone
                      ? `+91 ${user.phone}`
                      : "Not available"}
                  </strong>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="profile-info-item profile-address">

                <div className="info-icon">

                  <svg viewBox="0 0 24 24">

                    <path
                      d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"
                    />

                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                    />

                  </svg>

                </div>

                <div>

                  <span>
                    Delivery Address
                  </span>

                  <strong>
                    {user?.address ||
                      "Address not added yet"}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            ORDER HISTORY
        ==================================================== */}

        <section className="orders-section">


          {/* ORDERS HEADING */}

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


          {/* ORDERS */}

          <div className="orders-list">


            {orders.length === 0 ? (

              /* =================================================
                 NO ORDERS
              ================================================== */

              <div className="no-orders">

                <div className="no-orders-icon">

                  <svg viewBox="0 0 24 24">

                    <path
                      d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"
                    />

                    <circle
                      cx="9"
                      cy="20"
                      r="1.2"
                    />

                    <circle
                      cx="18"
                      cy="20"
                      r="1.2"
                    />

                  </svg>

                </div>


                <h3>
                  No orders yet
                </h3>

                <p>
                  You haven't placed an order yet.
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

              /* =================================================
                 ORDER LIST
              ================================================== */

              orders.map((order) => (

                <div
                  className="order-history-card"
                  key={order._id}
                >

                  <div className="order-history-main">

                    <div className="order-icon">
                      📦
                    </div>


                    <div className="order-information">

                      <div className="order-id-row">

                        <h3>
                          {order._id}
                        </h3>

                        <span className="order-status">
                          {order.status}
                        </span>

                      </div>


                      <p className="order-date">
                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                      </p>


                      <p className="order-items">
                        {order.items.length} items
                      </p>

                    </div>

                  </div>


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
                          `Order details for ${order._id} will be connected later.`
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


      {isEditing && (
        <div className="profile-modal" style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className="profile-modal-content" style={{background:'white', padding:'20px', borderRadius:'8px', width:'400px'}}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group" style={{marginBottom:'10px'}}>
                <label style={{display:'block', marginBottom:'5px'}}>Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required style={{width:'100%', padding:'8px'}} />
              </div>
              <div className="form-group" style={{marginBottom:'10px'}}>
                <label style={{display:'block', marginBottom:'5px'}}>Phone</label>
                <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} required style={{width:'100%', padding:'8px'}} />
              </div>
              <div className="form-group" style={{marginBottom:'20px'}}>
                <label style={{display:'block', marginBottom:'5px'}}>Address</label>
                <textarea name="address" value={editForm.address} onChange={handleEditChange} required style={{width:'100%', padding:'8px'}} />
              </div>
              <div className="modal-actions" style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} style={{padding:'8px 16px'}}>Cancel</button>
                <button type="submit" className="save-btn" style={{padding:'8px 16px', background:'#3498db', color:'white', border:'none'}}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
