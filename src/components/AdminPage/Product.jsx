import { Outlet,useNavigate  } from "react-router-dom";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import "./Admin.css"; // Import file CSS
import Books from "./Books";

const Product = () => {
    const navigate = useNavigate();
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
      <div className="admin-header">
        <h2 className="admin-title">Quản lý sản phẩm</h2>
        <button className="add-button" onClick={() => navigate("/admin/add_book")}>
            Thêm sản phẩm mới
          </button>
      </div>
      <Outlet /> 
      </div>
    </div>
  );
};

export default Product;
