import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("adminToken", response.data.token);

      // Save admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      // Go to admin dashboard
      navigate("/admin");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4">Admin Login</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;