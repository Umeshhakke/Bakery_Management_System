import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ width: "250px", background: "#2c3e50", color: "#fff", height: "100vh", padding: "1rem", display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>Admin Panel</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link to="/admin/dashboard" style={{ color: "#ecf0f1", textDecoration: "none", fontSize: "1.1rem", padding: "0.5rem", borderRadius: "4px" }}>Dashboard</Link>
        <Link to="/admin/orders" style={{ color: "#ecf0f1", textDecoration: "none", fontSize: "1.1rem", padding: "0.5rem", borderRadius: "4px" }}>Orders</Link>
        <Link to="/admin/products" style={{ color: "#ecf0f1", textDecoration: "none", fontSize: "1.1rem", padding: "0.5rem", borderRadius: "4px" }}>Products</Link>
        <Link to="/admin/users" style={{ color: "#ecf0f1", textDecoration: "none", fontSize: "1.1rem", padding: "0.5rem", borderRadius: "4px" }}>Users</Link>
      </nav>
      <button onClick={handleLogout} style={{ marginTop: "auto", padding: "0.75rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Logout</button>
    </div>
  );
}

export default AdminSidebar;
