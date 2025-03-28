import { useState, useEffect } from "react";
import {
  addBook,
  updateBook,
  deleteBook,
  fetchCategories,
} from "../../Services/apiservice";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminContent.css";

const AdminContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Hàm tạo ID ngẫu nhiên
  const generateId = () => crypto.randomUUID();

  // State cho thông tin sản phẩm
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

  // State chứa danh sách danh mục cho dropdown
  const [categories, setCategories] = useState([]);

  // Nếu có id (chỉnh sửa) thì tải dữ liệu sách
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/books/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFormData({
              name: data.name || "",
              authors:
                data.authors?.length > 0
                  ? data.authors
                  : [{ id: "", name: "", slug: "" }],
              categories: data.categories || {
                id: "",
                name: "",
                is_leaf: false,
              },
              current_seller: data.current_seller || { id: 1, price: "" },
              description: data.description || "",
              images:
                data.images?.length > 0 ? data.images : [{ base_url: "" }],
              list_price: data.list_price || "",
              original_price: data.original_price || "",
              rating_average: data.rating_average || "",
              short_description: data.short_description || "",
              specifications:
                data.specifications?.length > 0
                  ? data.specifications
                  : [{ name: "Thông tin chung", attributes: [] }],
            });
          }
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
  }, [id]);

  // Tải danh mục từ API khi component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    loadCategories();
  }, []);

  // Hàm xử lý thay đổi cho các ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý thay đổi dropdown cho danh mục
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find(
      (cat) => String(cat.id) === selectedId
    );
    setFormData({
      ...formData,
      categories: selectedCategory || { id: "", name: "", is_leaf: false },
    });
  };

  // Hàm submit form (thêm mới hoặc cập nhật sách)
  const handleSubmit = async (e) => {
    e.preventDefault();

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

  // Hàm xử lý xóa sản phẩm
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

        {/* Giá bán */}
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

        {/* Dropdown chọn danh mục */}
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className="form-control"
            value={formData.categories.id}
            onChange={handleCategoryChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* URL ảnh */}
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
          <button
            type="button"
            className="btn btn-danger mx-3"
            onClick={handleDelete}
          >
            Xóa sản phẩm
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminContent;
