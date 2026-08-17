import { API_URL } from "../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchOrders();
    fetchDeliveryStaff();
  }, [token, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDeliveryStaff = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/delivery-personnel`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setDeliveryStaff(data);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/confirm`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const assignDelivery = async (orderId, deliveryPersonId) => {
    if (!deliveryPersonId) return;
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ deliveryPersonId })
      });
      if (res.ok) {
        fetchOrders();
      } else {
        alert("Assignment failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f4f4f4", overflowY: "auto" }}>
        <h2>Manage Orders</h2>
        
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "0.5rem" }}>Order ID</th>
                <th style={{ padding: "0.5rem" }}>Customer</th>
                <th style={{ padding: "0.5rem", minWidth: "150px" }}>Items Ordered</th>
                <th style={{ padding: "0.5rem" }}>Total</th>
                <th style={{ padding: "0.5rem" }}>Status</th>
                <th style={{ padding: "0.5rem" }}>Payment</th>
                <th style={{ padding: "0.5rem" }}>Actions</th>
                <th style={{ padding: "0.5rem" }}>Assign Delivery</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}>{o._id.substring(18)}</td>
                  <td style={{ padding: "0.5rem" }}>
                    {o.customer.name} <br/>
                    <small>{o.customer.phone}</small>
                  </td>
                  <td style={{ padding: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
                    <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                      {o.items.map(item => (
                        <li key={item._id || item.itemId}>{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: "0.5rem", fontWeight: "bold" }}>₹{o.total}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <span style={{ padding: "0.2rem 0.4rem", borderRadius: "4px", fontSize: "0.85rem", background: o.status === "Delivered" ? "#2ecc71" : o.status === "Pending" ? "#e74c3c" : "#f1c40f", color: o.status === "Pending" ? "#fff" : (o.status === "Delivered" ? "#fff" : "#000") }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.5rem" }}>{o.paymentStatus}</td>
                  <td style={{ padding: "0.5rem" }}>
                    {o.status === "Pending" && (
                      <button onClick={() => confirmOrder(o._id)} style={{ padding: "0.3rem 0.6rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Confirm</button>
                    )}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    <select 
                      value={o.deliveryPerson?._id || ""} 
                      onChange={(e) => assignDelivery(o._id, e.target.value)}
                      style={{ padding: "0.3rem" }}
                      disabled={o.status === "Pending"}
                    >
                      <option value="">-- Select Person --</option>
                      {deliveryStaff.map(staff => (
                        <option key={staff._id} value={staff._id}>{staff.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
