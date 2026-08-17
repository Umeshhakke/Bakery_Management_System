import { API_URL } from "../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeliveryProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", address: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("deliveryToken");

  useEffect(() => {
    if (!token) {
      navigate("/delivery/login");
      return;
    }
    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setEditForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
          address: data.user.address || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#2c3e50", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Delivery Profile</h1>
        <button onClick={() => navigate("/delivery/dashboard")} style={{ padding: "0.5rem 1rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Dashboard</button>
      </header>

      <div style={{ maxWidth: "600px", margin: "3rem auto", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, color: "#2c3e50" }}>My Details</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} style={{ background: "#2ecc71", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#34495e" }}>Name</label>
              <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#34495e" }}>Phone</label>
              <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} required style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#34495e" }}>Vehicle Details / Address</label>
              <input type="text" name="address" value={editForm.address} onChange={handleEditChange} required style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: "0.8rem", background: "#95a5a6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
              <button type="submit" style={{ flex: 2, padding: "0.8rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save Changes</button>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.3rem", color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Full Name</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#2c3e50" }}>{user.name}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.3rem", color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Username</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#2c3e50" }}>{user.username}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.3rem", color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Email</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#2c3e50" }}>{user.email}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.3rem", color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Phone Number</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#2c3e50" }}>{user.phone || "Not provided"}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.3rem", color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Vehicle Details / Address</p>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#2c3e50" }}>{user.address || "Not provided"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryProfile;
