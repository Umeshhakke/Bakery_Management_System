import { API_URL } from "../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeliveryLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Here you would optimally check data.user.isDeliveryPerson
        // if your backend returns it in login response (like isAdmin).
        // Assuming it's added or we just let them try, if the backend 
        // /api/orders/delivery endpoint blocks them anyway.
        localStorage.setItem("deliveryToken", data.token);
        navigate("/delivery/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Delivery Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <button type="submit" style={{ padding: "0.75rem", background: "#f39c12", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" }}>Login as Delivery</button>
        </form>
      </div>
    </div>
  );
}

export default DeliveryLogin;
