import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getRequestHeader, API_URL } from "../utils/api";

function UserOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(`${API_URL}/orders/${id}`, {
          headers: getRequestHeader(true)
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          alert("Order not found");
          navigate("/profile");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  if (!order) return <div style={{ padding: "2rem", textAlign: "center" }}>Order not found</div>;

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header cartCount={0} />
      <div style={{ maxWidth: "800px", margin: "2rem auto", background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <button onClick={() => navigate("/profile")} style={{ background: "transparent", border: "none", color: "#3498db", cursor: "pointer", marginBottom: "1rem" }}>← Back to Profile</button>
        <h2>Order #{order._id.substring(18)}</h2>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "1rem", marginBottom: "1rem" }}>
          <div>
            <p><strong>Status:</strong> <span style={{ color: order.status === "Delivered" ? "green" : "orange" }}>{order.status}</span></p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p><strong>Total Amount:</strong> ₹{order.total}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          </div>
        </div>

        <h3>Items</h3>
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
          {order.items.map(item => (
            <li key={item._id || item.itemId} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px dashed #eee" }}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <h3>Delivery Details</h3>
        <div style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "4px" }}>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>

        {order.deliveryPerson && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#e8f6f3", borderLeft: "4px solid #1abc9c", borderRadius: "4px" }}>
            <h4>Delivery Personnel Assigned</h4>
            <p><strong>Name:</strong> {order.deliveryPerson.name}</p>
            <p><strong>Contact:</strong> {order.deliveryPerson.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrderDetails;
