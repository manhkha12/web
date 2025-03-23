import { Link } from "react-router-dom";
import { fetchBooks } from "../../Services/apiservice";
import "./Books.css"


const Books = () => {
  
    let products = fetchBooks();

    return (
      <div className="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.images[0].base_url}
                      alt={item.name}
                      width="50"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {item.current_seller && item.current_seller.price
                      ? item.current_seller.price.toLocaleString("vi-VN") + "đ"
                      : "Giá không có"}
                  </td>
                 
    
                  <td>
                    <button className="btn btn-primary btn-sm mx-1">Sửa</button>
                    <button className="btn btn-danger btn-sm">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Books;