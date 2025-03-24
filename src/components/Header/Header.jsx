import React from "react";
import "./Header.css";
import Search from "./Search";
import { SearchResultsList } from "./SearchResultsList";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Header({}) {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    // Lắng nghe sự kiện userUpdated để cập nhật state user
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  return (
    <header className=" p-2 d-flex">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ width: "100%" }}
      >
        <a
          className="navbar-brand d-none d-lg-block me-3"
          href="http://localhost:5173/?search=%C3%A1nis"
        >
          <img
            className="mx-4 col-md-1"
            style={{ width: "50px" }}
            src="/book-svgrepo-com.svg"
            alt=""
          ></img>
        </a>

        <button className="button-color border-0 d-lg-none ">
          <svg
            className="bi bi-chevron-left text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>

        <button
          className="navbar-toggler mx-3 border-0 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="col-md-8" style={{ position: "relative" }}>
          <Search setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>

        <button className="button-color border-0 d-lg-none ">
          <svg
            className="text-white "
            style={{ width: "40px", height: "30px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </button>

        <div className="header-icons d-lg-flex d-none col-md-4">
          <a href="#" className="home">
            <img
              className="mx-1"
              style={{ width: "20px" }}
              src="/home-svgrepo-com.svg"
              alt=""
            />
            Trang chủ
          </a>
          {/* <Link to="/login" className="Login">
            <img
              className="mx-1"
              style={{ width: "20px" }}
              src="/user-svgrepo-com.svg"
              alt=""
            />
            Đăng nhập 
            </Link>  */}
          {user ? (
            <div className="user-info">
              <img
                className="mx-1"
                style={{ width: "20px" }}
                src="/user-svgrepo-com.svg"
                alt=""
              />

              {user.username}
              <button
                onClick={() => {
                  localStorage.removeItem("user"); // Xóa user khi logout
                  setUser(null);
                  window.dispatchEvent(new Event("userUpdated"));
                }}
              >
                <img src="logout-svgrepo-com.svg" style={{ width: "20px" }} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="Login">
              <img
                className="mx-1"
                style={{ width: "20px" }}
                src="/user-svgrepo-com.svg"
                alt=""
              />
              Đăng nhập
            </Link>
          )}
          <a href="#" className="cart border-0 border-start mx-5">
            <img
              src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
              alt="Cart"
            />
            <span class="cart-count">0</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
export default Header;
