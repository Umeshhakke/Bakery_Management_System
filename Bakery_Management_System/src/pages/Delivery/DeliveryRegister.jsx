import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function DeliveryRegister() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("deliveryToken", data.token);
        navigate("/delivery/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Delivery Registration</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="tel" name="phone" placeholder="Phone" onChange={handleInputChange} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
          <button type="submit" style={{ padding: "0.75rem", background: "#f39c12", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" }}>Register as Delivery</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already registered? <Link to="/delivery/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default DeliveryRegister;
