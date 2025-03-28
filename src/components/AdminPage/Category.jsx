import { useState, useEffect } from "react";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../Services/apiservice";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory({ name: newCategory });
      setNewCategory("");
      loadCategories();
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setUpdatedName(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!updatedName.trim() || !editingCategory) return;
    try {
      await updateCategory(editingCategory.id, { name: updatedName });
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý danh mục</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên danh mục mới"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddCategory}>
          Thêm danh mục
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                {editingCategory?.id === category.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editingCategory?.id === category.id ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleUpdateCategory}
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditCategory(category)}
                  >
                    Sửa
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm mx-2"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
