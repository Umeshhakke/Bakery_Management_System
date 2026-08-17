import { useEffect, useState } from "react";
import { API_URL, getRequestHeader } from "../utils/api";
import "../styles/OrdersDashboard.css";

function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: getRequestHeader(true),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==============================
  // ORDER STATISTICS
  // ==============================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "preparing"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "completed"
  ).length;

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="orders-dashboard">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <h2>Loading orders...</h2>
          <p>Fetching the latest customer orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-label">
            BAKERY MANAGEMENT
          </span>

          <h1>
            Customer Orders
          </h1>

          <p>
            Manage and track orders placed by your customers.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchOrders}
        >
          ↻ Refresh Orders
        </button>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="order-statistics">

        <div className="stat-card">
          <div className="stat-icon">
            🧾
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            🕐
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            👨‍🍳
          </div>

          <div>
            <span>Preparing</span>
            <strong>{preparingOrders}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>

      </div>


      {/* =========================
          ORDERS
      ========================= */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            🛒
          </div>

          <h2>
            No orders yet
          </h2>

          <p>
            Orders placed by customers will appear here.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              {/* ORDER HEADER */}

              <div className="order-card-header">

                <div>
                  <span className="order-label">
                    ORDER
                  </span>

                  <h2>
                    #{order._id.slice(-6).toUpperCase()}
                  </h2>
                </div>

                <span
                  className={`order-status ${String(
                    order.status || "pending"
                  ).toLowerCase()}`}
                >
                  {order.status || "Pending"}
                </span>

              </div>


              {/* CUSTOMER DETAILS */}

              <div className="customer-details">

                <div className="customer-detail">

                  <span className="detail-icon">
                    👤
                  </span>

                  <div>
                    <small>Customer</small>
                    <strong>
                      {order.customer?.name || "N/A"}
                    </strong>
                  </div>

                </div>


                <div className="customer-detail">

                  <span className="detail-icon">
                    📞
                  </span>

                  <div>
                    <small>Phone</small>
                    <strong>
                      {order.customer?.phone || "N/A"}
                    </strong>
                  </div>

                </div>


                <div className="customer-detail address-detail">

                  <span className="detail-icon">
                    📍
                  </span>

                  <div>
                    <small>Delivery Address</small>
                    <strong>
                      {order.customer?.address || "N/A"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* ITEMS */}

              <div className="order-items-section">

                <div className="section-title">
                  🛒 Ordered Items
                </div>

                <div className="order-items">

                  {order.items?.map((item, index) => (

                    <div
                      className="order-item"
                      key={`${item.itemId}-${index}`}
                    >

                      <div className="item-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          ₹{item.price} × {item.quantity}
                        </span>

                      </div>

                      <strong className="item-total">
                        ₹{(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>

              </div>


              {/* FOOTER */}

              <div className="order-card-footer">

                <div>
                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{Number(order.total || 0).toFixed(2)}
                  </strong>
                </div>

                <span className="item-count">
                  {order.items?.length || 0} product
                  {(order.items?.length || 0) !== 1 ? "s" : ""}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default OrdersDashboard;