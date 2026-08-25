import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <p>Welcome to Seraphin Furniture Admin Panel.</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;