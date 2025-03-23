import { NavLink } from "react-router-dom";
import "./Admin.css"; // Đường dẫn đúng theo thư mục

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <NavLink to="/admin/dashboard" activeClassName="active">🏠 Dashboard</NavLink>
        <NavLink to="/admin" activeClassName="active">📚 Sản phẩm</NavLink>
        <NavLink to="/admin/category" activeClassName="active">📦 Danh mục</NavLink>
        <NavLink to="/admin/users" activeClassName="active">👤 Người dùng</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
