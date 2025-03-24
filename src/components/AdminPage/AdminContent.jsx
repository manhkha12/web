import { useState ,useEffect } from "react";
import { addBook, updateBook,deleteBook  } from "../../Services/apiservice";
import { useNavigate ,useParams } from "react-router-dom";
import "./AdminContent.css";
const AdminContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Hàm tạo ID ngẫu nhiên
  const generateId = () => crypto.randomUUID();

  const [formData, setFormData] = useState({
    name: "",
    authors: [{ id: "", name: "", slug: "" }],
    categories: { id: "", name: "", is_leaf: false },
    current_seller: { id: 1, price: "" },
    description: "",
    images: [{ base_url: "" }],
    list_price: "",
    original_price: "",
    rating_average: "",
    short_description: "",
    specifications: [{ name: "Thông tin chung", attributes: [] }],
  });


   // Nếu có id, gọi API để lấy thông tin sách cần sửa
   useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/books/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setFormData({
              name: data.name || "",
              authors: data.authors?.length > 0 ? data.authors : [{ id: "", name: "", slug: "" }],
              categories: data.categories || { id: "", name: "", is_leaf: false },
              current_seller: data.current_seller || { id: 1, price: "" },
              description: data.description || "",
              images: data.images?.length > 0 ? data.images : [{ base_url: "" }],
              list_price: data.list_price || "",
              original_price: data.original_price || "",
              rating_average: data.rating_average || "",
              short_description: data.short_description || "",
              specifications: data.specifications?.length > 0 ? data.specifications : [{ name: "Thông tin chung", attributes: [] }],
            });
          }
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
    }
  }, [id]);

  // Hàm xử lý nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý thêm sách
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo ID tự động nếu bị null
    const updatedData = {
      ...formData,
      authors: formData.authors.map((author) => ({
        ...author,
        id: author.id || generateId(),
      })),
      categories: {
        ...formData.categories,
        id: formData.categories.id || generateId(),
      },
    };

    try {
        if (id) {
            await updateBook(id, updatedData);
            alert("Cập nhật sản phẩm thành công!");
          } else {
            await addBook(updatedData);
            alert("Thêm sản phẩm thành công!");
          }
          navigate("/admin");
        } catch (error) {
          console.error("Lỗi khi xử lý sản phẩm:", error);
        }
  };


  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      try {
        await deleteBook(id);
        alert("Xóa sản phẩm thành công!");
        navigate("/admin");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên sách */}
        <div className="mb-3">
          <label className="form-label">Tên sách</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tác giả */}
        <div className="mb-3">
          <label className="form-label">Tác giả</label>
          <input
            type="text"
            name="authors[0].name"
            className="form-control"
            value={formData.authors[0].name}
            onChange={(e) =>
              setFormData({
                ...formData,
                authors: [{ ...formData.authors[0], name: e.target.value }],
              })
            }
            required
          />
        </div>

        {/* Giá */}
        <div className="mb-3">
          <label className="form-label">Giá bán</label>
          <input
            type="number"
            name="current_seller.price"
            className="form-control"
            value={formData.current_seller.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                current_seller: {
                  ...formData.current_seller,
                  price: e.target.value,
                },
              })
            }
            required
          />
        </div>

        {/* Giá gốc */}
        <div className="mb-3">
          <label className="form-label">Giá gốc</label>
          <input
            type="number"
            name="original_price"
            className="form-control"
            value={formData.original_price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Đánh giá trung bình
                <div className="mb-3">
                    <label className="form-label">Đánh giá trung bình</label>
                    <input
                        type="number"
                        step="0.1"
                        name="rating_average"
                        className="form-control"
                        value={formData.rating_average}
                        onChange={handleChange}
                    />
                </div> */}

        {/* Mô tả ngắn
                <div className="mb-3">
                    <label className="form-label">Mô tả ngắn</label>
                    <textarea
                        name="short_description"
                        className="form-control"
                        value={formData.short_description}
                        onChange={handleChange}
                    ></textarea>
                </div> */}

        {/* Mô tả chi tiết
                <div className="mb-3">
                    <label className="form-label">Mô tả chi tiết</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div> */}

        {/* Danh mục */}
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <input
            type="text"
            name="categories.name"
            className="form-control"
            value={formData.categories.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: { ...formData.categories, name: e.target.value },
              })
            }
            required
          />
        </div>

        {/* Ảnh */}
        <div className="mb-3">
          <label className="form-label">URL Ảnh</label>
          <input
            type="text"
            name="images.base_url"
            className="form-control"
            value={formData.images[0].base_url}
            onChange={(e) =>
              setFormData({
                ...formData,
                images: [{ base_url: e.target.value }],
              })
            }
            required
          />
        </div>

        {/* Nút submit */}
        <button type="submit" className="btn btn-primary">
        {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
        {id && (
          <button type="button" className="btn btn-danger mx-3" onClick={handleDelete}>
            Xóa sản phẩm
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminContent;
