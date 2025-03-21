import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/apiservice"; // Import API đăng nhập
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi đăng nhập

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Bắt đầu loading
      const user = await loginUser(email, password);

      if (user) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(user)); // Lưu user vào localStorage
        navigate(user.role === "admin" ? "/admin-dashboard" : "/"); // Điều hướng
      } else {
        alert("Sai email hoặc mật khẩu!");
      }
    } catch (error) {
      alert("Lỗi đăng nhập: " + error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Ghi nhớ đăng nhập
            </label>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
