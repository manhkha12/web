import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../Services/apiservice"; // Import API đăng ký
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading
    const navigate = useNavigate(); // Dùng để chuyển hướng sau khi đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true); // Bắt đầu loading
      await registerUser({ username: name, email, password, role: "user" });
      alert("Đăng ký thành công!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Đăng ký</h2>

        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label className="register-label">Họ và tên:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="register-input"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label">Xác nhận mật khẩu:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
