import { API_URL } from "../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", quantity: "", price: "", category: "Cakes", image: "", unit: "1 pc" });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", quantity: "", price: "", category: "Cakes", image: "", unit: "1 pc" });
        setEditingId(null);
        fetchProducts();
      } else {
        alert("Operation failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      category: product.category,
      image: product.image || "",
      unit: product.unit || "1 pc"
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f4f4f4", overflowY: "auto" }}>
        <h2>Manage Products</h2>
        
        {/* ADD / EDIT FORM */}
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required style={{ padding: "0.5rem", flex: "1 1 200px" }} />
            <input type="number" name="quantity" placeholder="Stock Qty" value={formData.quantity} onChange={handleInputChange} required style={{ padding: "0.5rem", flex: "1 1 100px" }} />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required style={{ padding: "0.5rem", flex: "1 1 100px" }} />
            <input type="text" name="unit" placeholder="Desc. Unit (e.g. 1 box of 6 pcs, 1 pc of 250gm)" value={formData.unit} onChange={handleInputChange} required style={{ padding: "0.5rem", flex: "1 1 250px" }} />
            <select name="category" value={formData.category} onChange={handleInputChange} style={{ padding: "0.5rem", flex: "1 1 150px" }}>
              <option value="Cakes">Cakes</option>
              <option value="Biscuits">Biscuits</option>
              <option value="Khari">Khari</option>
              <option value="Breads & Buns">Breads & Buns</option>
              <option value="Others">Others</option>
            </select>
            <input type="text" name="image" placeholder="Image URL (Required for Menu)" value={formData.image} onChange={handleInputChange} style={{ padding: "0.5rem", flex: "1 1 300px" }} />
            <button type="submit" style={{ padding: "0.5rem 1rem", background: "#27ae60", color: "#fff", border: "none", cursor: "pointer" }}>
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", quantity: "", price: "", category: "Cakes", image: "", unit: "1 pc" }); }} style={{ padding: "0.5rem 1rem", background: "#7f8c8d", color: "#fff", border: "none", cursor: "pointer" }}>Cancel</button>
            )}
          </form>
        </div>

        {/* PRODUCTS TABLE */}
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "0.5rem" }}>Image</th>
                <th style={{ padding: "0.5rem" }}>Name</th>
                <th style={{ padding: "0.5rem" }}>Unit</th>
                <th style={{ padding: "0.5rem" }}>Category</th>
                <th style={{ padding: "0.5rem" }}>Price</th>
                <th style={{ padding: "0.5rem" }}>Stock</th>
                <th style={{ padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}>
                    {p.image ? <img src={p.image} alt={p.name} width="50" height="50" style={{ objectFit: "cover", borderRadius: "4px" }} /> : "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem" }}>{p.name}</td>
                  <td style={{ padding: "0.5rem" }}>{p.unit || "1 pc"}</td>
                  <td style={{ padding: "0.5rem" }}>{p.category}</td>
                  <td style={{ padding: "0.5rem" }}>₹{p.price}</td>
                  <td style={{ padding: "0.5rem" }}>{p.quantity}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <button onClick={() => handleEdit(p)} style={{ marginRight: "0.5rem", padding: "0.3rem 0.6rem", background: "#f39c12", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{ padding: "0.3rem 0.6rem", background: "#c0392b", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>Delete</button>
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

export default AdminProducts;
