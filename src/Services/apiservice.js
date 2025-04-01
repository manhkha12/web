import { useState, useEffect } from "react";
const fetchBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books") // Fetch từ API JSON Server
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return books;
};

export default fetchBooks;

const addBook = async (bookData) => {
  console.log(">>>>>", bookData);

  try {
    const response = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Lỗi ${response.status}: ${errorData.message || "Không thể thêm sách!"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

const updateBook = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Lỗi ${response.status}: ${
          errorData.message || "Không thể cập nhật sách!"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: Không thể xoá sản phẩm!`);
    }

    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xoá sản phẩm:", error);
    throw error;
  }
};

const API_URL = "http://localhost:5000/users";






// Lấy danh sách người dùng

 const fetchUsers = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log("Danh sách người dùng:", data);
  return data;
};


// Thêm người dùng mới
 const addUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Cập nhật người dùng
 const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Xóa người dùng
const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};









// Đăng ký user mới
const registerUser = async (userData) => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Lỗi khi lấy danh sách user!");
  const users = await response.json();

  // Kiểm tra xem email đã tồn tại chưa
  const userExists = users.find((user) => user.email === userData.email);
  if (userExists) {
    throw new Error("Email đã tồn tại!");
  }

  // Thêm user vào JSON Server
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Lỗi khi đăng ký!");
  return res.json();
};

const loginUser = async (email, password) => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Lỗi khi lấy danh sách user!");
  const users = await response.json();

  // Kiểm tra user có tồn tại không
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Email hoặc mật khẩu không đúng!");
  }

  return user; // Trả về thông tin user
};

export { fetchBooks, registerUser, loginUser, addBook, updateBook, deleteBook ,fetchUsers, addUser, updateUser, deleteUser};

// Phần category
// Lấy danh sách danh mục
const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:5000/categories");
    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: Không thể lấy danh mục!`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw error;
  }
};

// Thêm mới danh mục
const addCategory = async (categoryData) => {
  try {
    const response = await fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Lỗi ${response.status}: ${
          errorData.message || "Không thể thêm danh mục!"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
    throw error;
  }
};

// Cập nhật danh mục
const updateCategory = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Lỗi ${response.status}: ${
          errorData.message || "Không thể cập nhật danh mục!"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
};

// Xóa danh mục
const deleteCategory = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: Không thể xoá danh mục!`);
    }

    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xoá danh mục:", error);
    throw error;
  }
};

export { fetchCategories, addCategory, updateCategory, deleteCategory };
