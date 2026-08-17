import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, users: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [prodRes, userRes] = await Promise.all([
          fetch("http://localhost:5000/api/products"),
          fetch("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        const products = await prodRes.json();
        const users = await userRes.json();
        
        setStats({ products: products.length || 0, users: users.length || 0 });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f4f4f4", overflowY: "auto" }}>
        <h1>Dashboard Overview</h1>
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", flex: 1, textAlign: "center" }}>
            <h3>Total Products</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#ff6b6b" }}>{stats.products}</p>
          </div>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", flex: 1, textAlign: "center" }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#3498db" }}>{stats.users}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
