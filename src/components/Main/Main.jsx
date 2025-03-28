import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks, fetchCategories } from "../../Services/apiservice";
import Header from "../Header/Header";

const Main = () => {
  // State cho sách
  const [products, setProducts] = useState([]);
  // State cho danh mục từ API
  const [categories, setCategories] = useState([]);
  // State cho danh mục được chọn (lưu id)
  const [selectedCategory, setSelectedCategory] = useState("");

  // Tải danh mục khi component mount
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

  // Hàm tải sách, nếu có danh mục được chọn, thêm query parameter để lọc
  const loadBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      if (selectedCategory) {
        // Lọc sách trên client theo trường categories.id
        const filtered = data.filter(
          (book) => book.categories && book.categories.id === selectedCategory
        );
        setProducts(filtered);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sách:", error);
    }
  };

  // Tải sách mỗi khi selectedCategory thay đổi
  useEffect(() => {
    loadBooks();
  }, [selectedCategory]);

  // Xử lý khi ấn vào danh mục: cập nhật selectedCategory
  const handleCategoryClick = (e, catId) => {
    e.preventDefault(); // Ngăn trang reload
    setSelectedCategory(catId);
  };


  return (
    <main>
      <div>
        <div className=" d-lg-none bg-white">
          <div className="d-flex justify-content-around">
            <a className="text-decoration-none mx-2" href="">
              Phổ biến{" "}
            </a>
            <svg
              style={{ marginTop: "10px" }}
              className="text-secondary bi bi-circle-fill svg"
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>

            <a className="text-decoration-none mx-2 text-dark" href="">
              Bán chạy{" "}
            </a>
            <svg
              style={{ marginTop: "10px" }}
              className="text-secondary bi bi-circle-fill svg"
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>

            <a className="text-decoration-none mx-2 text-dark" href="">
              Hàng mới
            </a>
            <svg
              className="text-secondary bi bi-circle-fill svg"
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>

            <a className="text-decoration-none text-dark" href="">
              Giá
              <svg
                className="bi bi-arrow-down-up mx-2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </a>
          </div>
          <hr />
          <div className="my-1">
            <button className="border-0 bg-white">
              <svg
                className="bi bi-funnel mb-2"
                style={{ width: "30px", height: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
              Lọc
            </button>

            <span className="mx-2 border-start ">
              <img
                style={{ width: "60px", height: "30px", padding: "5px" }}
                className="bg-secondary bg-opacity-10 rounded-pill mx-2 my-2"
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRGNefI3_6xoy0zU5_onTePfOCN0V_WLxkwKVfZ5COldSjLipxU"
                alt=""
              />
            </span>
          </div>
        </div>

        <nav
          className="mx-5 d-lg"
          style={{ "--bs-breadcrumb-divider": ">" }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item fw-light">
              <a className="text-dark text-decoration-none" href="#">
                Trang chủ
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
              Nhà Sách TiKi
            </li>
          </ol>
        </nav>

        <div>
          <div class="products d-flex flex-wrap"></div>
        </div>
        <div className="mt-4 mx-5">
          <div className="row">
            {/* Menu */}
            <div className="col-md-2 d-lg">
              <div className="border-0 px-3 ">
                <h6 style={{ fontSize: "15px" }}>Danh Mục Sản Phẩm</h6>
                <ul className="list-unstyled fs">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category.id}>
                        <a className="text-dark text-decoration-none" href="#"
                          onClick={(e) => handleCategoryClick(e, category.id)}> {category.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>Không có danh mục</li>
                  )}
                </ul>
                <hr />
              </div>

              <div className="border-0 px-3">
                <h6 style={{ fontSize: "15px" }}>Nhà cung cấp</h6>
                {[
                  "Nhà sách Fahasa",
                  "Bamboo Books",
                  "Times Books",
                  "Nhà Sách Trẻ Online",
                  "VBooks",
                ].map((provider, index) => (
                  <div className="form-check fs" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`provider${index + 1}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`provider${index + 1}`}
                    >
                      {provider}
                    </label>
                  </div>
                ))}
                <a href="#" className="text-primary text-decoration-none">
                  Xem thêm
                  <svg
                    style={{ margin: "4px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </a>
                <hr />
              </div>

              <div className="border-0 px-3">
                <h6>Đánh giá</h6>
                {[5, 4, 3].map((rating) => (
                  <div key={rating}>
                    {[...Array(rating)].map((_, index) => (
                      <i key={index}>
                        <img
                          className="img-rating"
                          src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-complex-star-icon-png-image_924677.jpg"
                          alt="star"
                        />
                      </i>
                    ))}
                    {[...Array(5 - rating)].map((_, index) => (
                      <i key={index}>
                        <img
                          className="img-rating"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9udSbMdEnEyuTKKk9FULBjsi3hjYi-EXi6g&s"
                          alt="half-star"
                        />
                      </i>
                    ))}
                    từ {rating} sao
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-10">
              <div className="row ">
                <div className="products d-flex flex-wrap row row-cols-lg-5 row-cols-2">
                  {products.length &&
                    products.map((item, index) => (
                      <Link
                        to={"book/" + item.id}
                        className="text-decoration-none col my-1 d-flex p-1"
                      >
                        <div className="card " key={index}>
                          <img
                            style={{ width: "100%", height: "35%" }}
                            src={item.images[0].base_url}
                            className="card-img-top my-1"
                            alt="..."
                          />
                          <div className="card-body">
                            <h6 className="card-title"> {item.name}</h6>
                            <p className="card-text">
                              Giá:{" "}
                              {item.current_seller && item.current_seller.price
                                ? item.current_seller.price.toLocaleString(
                                    "vi-VN"
                                  ) + "đ"
                                : "Giá không có"}
                            </p>
                            <p className="card-text">
                              Đánh giá:{" "}
                              {item.rating_average || "Chưa có đánh giá"} ⭐
                            </p>
                            <p className="card-text">
                              Đã bán:{" "}
                              {item.quantity_sold
                                ? item.quantity_sold.text
                                : "Chưa có thông tin"}
                            </p>
                          </div>
                          <hr />
                          <p
                            className="text-center fw-light"
                            style={{ fontSize: "12px" }}
                          >
                            Giao siêu tốc 2h
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Page navigation example"
          className="d-none d-md-block"
          style={{ marginTop: "100px" }}
        >
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item">
              <a
                className="page-link text-white bg-primary border border-0 "
                href="#"
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary border border-0" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary border border-0" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary border border-0" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary border border-0" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link border border-0" href="#">
                ‎
              </a>
            </li>
            <li className="page-item">
              <a className="page-link border border-0" href="#">
                ‎
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary border border-0" href="#">
                50
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Main;
