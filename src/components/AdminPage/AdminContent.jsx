import { useState } from "react";
import { addBook } from "../../Services/apiservice";
import { useNavigate } from "react-router-dom";
import "./AdminContent.css"
const AdminContent = () => {
    const navigate = useNavigate();
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

    // Hàm xử lý nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm xử lý thêm sách
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(formData);
            alert("Thêm sản phẩm thành công!");
            navigate("/admin");
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thêm mới sản phẩm</h2>
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
                                current_seller: { ...formData.current_seller, price: e.target.value },
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

                {/* Đánh giá trung bình */}
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
                </div>

                {/* Mô tả ngắn */}
                <div className="mb-3">
                    <label className="form-label">Mô tả ngắn</label>
                    <textarea
                        name="short_description"
                        className="form-control"
                        value={formData.short_description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Mô tả chi tiết */}
                <div className="mb-3">
                    <label className="form-label">Mô tả chi tiết</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

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
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
};

export default AdminContent;
