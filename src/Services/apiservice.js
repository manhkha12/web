import { useState, useEffect } from "react";
const fetchBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/books") // Fetch từ API JSON Server
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return books;
};

export default fetchBooks;
 
const addBook = async (bookData) => {
    try {
        const response = await fetch("http://localhost:5000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi ${response.status}: ${errorData.message || "Không thể thêm sách!"}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};


const API_URL = "http://localhost:5000/users";
// Đăng ký user mới
const registerUser = async (userData) => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách user!");
    const users = await response.json();

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = users.find(user => user.email === userData.email);
    if (userExists) {
        throw new Error("Email đã tồn tại!");
    }

    // Thêm user vào JSON Server
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });

    if (!res.ok) throw new Error("Lỗi khi đăng ký!");
    return res.json();
};



const loginUser = async (email, password) => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách user!");
    const users = await response.json();

    // Kiểm tra user có tồn tại không
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error("Email hoặc mật khẩu không đúng!");
    }

    return user; // Trả về thông tin user
};

export {fetchBooks,registerUser ,loginUser ,addBook};
