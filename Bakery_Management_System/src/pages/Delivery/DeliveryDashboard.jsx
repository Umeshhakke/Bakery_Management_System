import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Active"); // Active, Completed, Issues
  
  // Modals
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueReason, setIssueReason] = useState("");
  const [issueDetails, setIssueDetails] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("deliveryToken");

  useEffect(() => {
    if (!token) {
      navigate("/delivery/login");
      return;
    }
    fetchOrders();
  }, [token, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/delivery", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrder = async (id, updates) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reportIssue = async () => {
    if (!selectedOrder) return;
    const finalIssueString = `${issueReason}: ${issueDetails}`;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${selectedOrder._id}/issue`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ issue: finalIssueString })
      });
      if (res.ok) {
        setIsIssueModalOpen(false);
        setSelectedOrder(null);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("deliveryToken");
    navigate("/delivery/login");
  };

  const openPaymentModal = (order) => {
    setSelectedOrder(order);
    setPaymentMethod("Cash");
    setIsPaymentModalOpen(true);
  };

  const openIssueModal = (order) => {
    setSelectedOrder(order);
    setIssueReason("Customer Unavailable");
    setIssueDetails("");
    setIsIssueModalOpen(true);
  };

  const confirmPayment = () => {
    if (selectedOrder) {
      updateOrder(selectedOrder._id, { 
        status: "Delivered", 
        paymentStatus: "Paid", 
        paymentMethod: paymentMethod 
      });
      setIsPaymentModalOpen(false);
      setSelectedOrder(null);
    }
  };

  // Filter orders based on tabs
  const activeOrders = orders.filter(o => o.status === "Assigned" || o.status === "Out for Delivery");
  const completedOrders = orders.filter(o => o.status === "Delivered");
  const issueOrders = orders.filter(o => o.status === "Issue Reported");

  // Stats
  const cashCollected = completedOrders.filter(o => o.paymentMethod === "Cash").reduce((acc, o) => acc + o.total, 0);
  const onlineCollected = completedOrders.filter(o => o.paymentMethod === "Online").reduce((acc, o) => acc + o.total, 0);

  const displayedOrders = activeTab === "Active" ? activeOrders : activeTab === "Completed" ? completedOrders : issueOrders;

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh", paddingBottom: "2rem", fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ background: "#2c3e50", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Delivery Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Logout</button>
      </header>

      <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
        
        {/* STATS SECTION */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #3498db", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: 0, color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Active Deliveries</h3>
            <p style={{ margin: "0.5rem 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>{activeOrders.length}</p>
          </div>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #2ecc71", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: 0, color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Completed Today</h3>
            <p style={{ margin: "0.5rem 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>{completedOrders.length}</p>
          </div>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #f1c40f", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: 0, color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Cash Collected</h3>
            <p style={{ margin: "0.5rem 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>₹{cashCollected}</p>
          </div>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #9b59b6", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: 0, color: "#7f8c8d", fontSize: "0.9rem", textTransform: "uppercase" }}>Online Collected</h3>
            <p style={{ margin: "0.5rem 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>₹{onlineCollected}</p>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", borderBottom: "2px solid #ddd", marginBottom: "1.5rem" }}>
          <button 
            onClick={() => setActiveTab("Active")}
            style={{ padding: "0.75rem 1.5rem", border: "none", background: "none", fontSize: "1rem", fontWeight: "bold", color: activeTab === "Active" ? "#2980b9" : "#7f8c8d", borderBottom: activeTab === "Active" ? "3px solid #2980b9" : "3px solid transparent", cursor: "pointer", transition: "all 0.2s" }}>
            Active ({activeOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab("Completed")}
            style={{ padding: "0.75rem 1.5rem", border: "none", background: "none", fontSize: "1rem", fontWeight: "bold", color: activeTab === "Completed" ? "#2ecc71" : "#7f8c8d", borderBottom: activeTab === "Completed" ? "3px solid #2ecc71" : "3px solid transparent", cursor: "pointer", transition: "all 0.2s" }}>
            Completed ({completedOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab("Issues")}
            style={{ padding: "0.75rem 1.5rem", border: "none", background: "none", fontSize: "1rem", fontWeight: "bold", color: activeTab === "Issues" ? "#e74c3c" : "#7f8c8d", borderBottom: activeTab === "Issues" ? "3px solid #e74c3c" : "3px solid transparent", cursor: "pointer", transition: "all 0.2s" }}>
            Issues Reported ({issueOrders.length})
          </button>
        </div>

        {/* ORDER LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {displayedOrders.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "8px", color: "#95a5a6" }}>
              <h3>No {activeTab.toLowerCase()} orders found.</h3>
              <p>You're all caught up here!</p>
            </div>
          )}

          {displayedOrders.map(o => (
            <div key={o._id} style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", border: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem", color: "#2c3e50" }}>Order #{o._id.substring(18)}</h3>
                  <span style={{ padding: "0.2rem 0.6rem", background: o.status === "Delivered" ? "#e8f8f5" : o.status === "Issue Reported" ? "#fdedec" : "#fef9e7", color: o.status === "Delivered" ? "#27ae60" : o.status === "Issue Reported" ? "#c0392b" : "#d35400", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }}>
                    {o.status}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>₹{o.total}</p>
                  <small style={{ color: "#7f8c8d" }}>{o.items?.length || 0} items</small>
                </div>
              </div>

              <div style={{ background: "#f9fbfb", padding: "1rem", borderRadius: "6px", marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <p style={{ margin: "0 0 0.3rem", fontSize: "0.85rem", color: "#7f8c8d", textTransform: "uppercase" }}>Customer</p>
                    <p style={{ margin: 0, fontWeight: "bold", color: "#34495e" }}>{o.customer.name}</p>
                    <p style={{ margin: 0, color: "#34495e" }}>📞 {o.customer.phone}</p>
                  </div>
                  <div style={{ flex: "2 1 300px" }}>
                    <p style={{ margin: "0 0 0.3rem", fontSize: "0.85rem", color: "#7f8c8d", textTransform: "uppercase" }}>Delivery Address</p>
                    <p style={{ margin: 0, color: "#34495e", lineHeight: 1.4 }}>📍 {o.customer.address}</p>
                  </div>
                </div>
              </div>

              {o.status === "Issue Reported" && (
                <div style={{ padding: "1rem", background: "#fdf2e9", borderLeft: "4px solid #e67e22", borderRadius: "4px", marginBottom: "1rem" }}>
                  <h4 style={{ margin: "0 0 0.3rem", color: "#d35400" }}>Reported Issue</h4>
                  <p style={{ margin: 0, color: "#873600" }}>{o.deliveryIssue}</p>
                </div>
              )}
              
              {o.status === "Delivered" && (
                <div style={{ padding: "1rem", background: "#eaeded", borderRadius: "4px", marginBottom: "1rem", display: "flex", gap: "2rem" }}>
                  <div>
                    <p style={{ margin: "0 0 0.2rem", fontSize: "0.85rem", color: "#7f8c8d" }}>Payment Status</p>
                    <p style={{ margin: 0, fontWeight: "bold", color: "#27ae60" }}>✓ {o.paymentStatus}</p>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 0.2rem", fontSize: "0.85rem", color: "#7f8c8d" }}>Payment Method</p>
                    <p style={{ margin: 0, fontWeight: "bold", color: "#34495e" }}>{o.paymentMethod || "N/A"}</p>
                  </div>
                </div>
              )}

              {activeTab === "Active" && (
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  {o.status === "Assigned" && (
                    <button onClick={() => updateOrder(o._id, { status: "Out for Delivery" })} style={{ flex: 1, padding: "0.8rem", background: "#3498db", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" }}>
                      🚀 Mark Out for Delivery
                    </button>
                  )}
                  {o.status === "Out for Delivery" && (
                    <button onClick={() => openPaymentModal(o)} style={{ flex: 2, padding: "0.8rem", background: "#2ecc71", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" }}>
                      ✅ Collect Payment & Complete
                    </button>
                  )}
                  <button onClick={() => openIssueModal(o)} style={{ flex: 1, padding: "0.8rem", background: "#fff", color: "#e74c3c", border: "1px solid #e74c3c", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" }}>
                    ⚠️ Report Issue
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && selectedOrder && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "400px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 1.5rem", color: "#2c3e50" }}>Collect Payment</h2>
            <div style={{ background: "#f8f9f9", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.5rem", color: "#7f8c8d" }}>Amount to collect</p>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#2c3e50" }}>₹{selectedOrder.total}</p>
            </div>
            
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              <button 
                onClick={() => setPaymentMethod("Cash")}
                style={{ flex: 1, padding: "1rem", border: paymentMethod === "Cash" ? "2px solid #3498db" : "1px solid #ddd", background: paymentMethod === "Cash" ? "#ebf5fb" : "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold", color: paymentMethod === "Cash" ? "#2980b9" : "#7f8c8d" }}
              >
                💵 Cash
              </button>
              <button 
                onClick={() => setPaymentMethod("Online")}
                style={{ flex: 1, padding: "1rem", border: paymentMethod === "Online" ? "2px solid #3498db" : "1px solid #ddd", background: paymentMethod === "Online" ? "#ebf5fb" : "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold", color: paymentMethod === "Online" ? "#2980b9" : "#7f8c8d" }}
              >
                📱 Online
              </button>
            </div>

            {paymentMethod === "Online" && (
              <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#fdfefe", border: "1px dashed #bdc3c7", borderRadius: "8px" }}>
                <p style={{ fontSize: "0.9rem", color: "#7f8c8d", margin: "0 0 1rem" }}>Have customer scan to pay admin</p>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=admin@upi&pn=Bakery&am=${selectedOrder.total}`} 
                  alt="Payment QR" 
                  style={{ width: "180px", height: "180px", display: "block", margin: "0 auto" }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={() => {setIsPaymentModalOpen(false); setSelectedOrder(null);}} style={{ flex: 1, padding: "0.8rem", background: "#ecf0f1", color: "#7f8c8d", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
              <button onClick={confirmPayment} style={{ flex: 2, padding: "0.8rem", background: "#2ecc71", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Complete Delivery</button>
            </div>
          </div>
        </div>
      )}

      {/* ISSUE MODAL */}
      {isIssueModalOpen && selectedOrder && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 0.5rem", color: "#e74c3c" }}>Report Issue</h2>
            <p style={{ margin: "0 0 1.5rem", color: "#7f8c8d", fontSize: "0.9rem" }}>Order #{selectedOrder._id.substring(18)}</p>
            
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#2c3e50", fontSize: "0.9rem" }}>Primary Reason</label>
              <select 
                value={issueReason} 
                onChange={(e) => setIssueReason(e.target.value)}
                style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem", outline: "none" }}
              >
                <option value="Customer Unavailable">Customer Unavailable</option>
                <option value="Wrong Address">Wrong Address</option>
                <option value="Customer Refused Order">Customer Refused Order</option>
                <option value="Items Damaged">Items Damaged in Transit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#2c3e50", fontSize: "0.9rem" }}>Additional Details</label>
              <textarea 
                rows="3"
                placeholder="Explain the issue briefly..."
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "0.9rem", resize: "none", outline: "none", boxSizing: "border-box" }}
              ></textarea>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => {setIsIssueModalOpen(false); setSelectedOrder(null);}} style={{ flex: 1, padding: "0.8rem", background: "#ecf0f1", color: "#7f8c8d", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
              <button onClick={reportIssue} style={{ flex: 2, padding: "0.8rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Submit Report</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DeliveryDashboard;
