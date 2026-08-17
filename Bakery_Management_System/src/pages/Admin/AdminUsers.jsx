import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchUsers();
  }, [token, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      const payload = {
        isAdmin: newRole === "Admin",
        isDeliveryPerson: newRole === "Delivery",
      };

      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f4f4f4", overflowY: "auto" }}>
        <h2>Manage Users & Roles</h2>
        
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "0.5rem" }}>Name</th>
                <th style={{ padding: "0.5rem" }}>Username</th>
                <th style={{ padding: "0.5rem" }}>Email</th>
                <th style={{ padding: "0.5rem" }}>Phone</th>
                <th style={{ padding: "0.5rem" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const currentRole = u.isAdmin ? "Admin" : u.isDeliveryPerson ? "Delivery" : "User";
                
                return (
                <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}>{u.name}</td>
                  <td style={{ padding: "0.5rem" }}>{u.username}</td>
                  <td style={{ padding: "0.5rem" }}>{u.email}</td>
                  <td style={{ padding: "0.5rem" }}>{u.phone}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <select 
                      value={currentRole} 
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      style={{ padding: "0.3rem", borderRadius: "4px" }}
                    >
                      <option value="User">User</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
