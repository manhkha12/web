import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchBooks } from "../../Services/apiservice";

function BookDetail() {
  const { id } = useParams();
  let products = fetchBooks();
  let book = products.find((item) => item.id == id);

  return (
    <>
      <Header />
      <main className="row mx-5 gap-2 d-flex flex-wrap my-3">
        <div style={{ height: "700px" }} className="row col-md-3 col-lg-3 d-sm">
          <div className="card h-100">
            <img
              className="my-3"
              src={book ? book.images[0].base_url : ""}
              alt=""
            />
            <div className="p-3 pb-3">
              <h6>
                <strong>Đặc điểm nổi bật</strong>
              </h6>
              <div className="d-flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-circle-fill text-primary me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <span style={{ fontSize: "14px" }}>
                  Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền bỉ.
                </span>
              </div>
              <div className="d-flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-circle-fill text-primary me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <span style={{ fontSize: "14px" }}>
                  Hình vẽ ngộ nghĩnh và màu sắc sống động, thu hút sự chú ý của
                  trẻ em.
                </span>
              </div>
              <div className="d-flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-circle-fill text-primary me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <span style={{ fontSize: "14px" }}>
                  Cung cấp thông tin tổng quát về diện tích, dân số và ngôn ngữ
                  của các quốc gia.
                </span>
              </div>
            </div>
            <div className="card-footer">
              <button className="border border-0 ">
                <div>
                  <img
                    style={{ width: "30px" }}
                    src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                    alt=""
                  />
                  <span
                    className="text-secondary mx-2"
                    style={{ fontSize: "10px" }}
                  >
                    Xem thêm
                  </span>
                  <span style={{ fontSize: "10px" }}>
                    Tóm tắt nội dung Sách
                  </span>
                  <img
                    className="ms-3"
                    style={{ width: "20px" }}
                    src="https://salt.tikicdn.com/ts/ta/5c/76/e2/25aa7773e0480b23252d8f1c95a03d05.png"
                    alt=""
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="row col-md-6 col-lg-6 d-sm">
          <div className="card h-100">
            <div>
              <img
                style={{ width: "80px", height: "20px" }}
                src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                className="card-img-top mx-3"
                alt="..."
              />
              <span>
                Tác giả:{" "}
                <span className="text-primary">
                  {book && book.authors ? book.authors[0].name : ""}
                </span>
              </span>
            </div>

            <div className="card-body">
              <h5 className="card-title">{book ? book.name : ""}</h5>
              <div>
                <span className="mx-2" style={{ fontSize: "14px" }}>
                  {book ? book.rating_average : ""}
                </span>
                <span className="text-warning">★★★★★</span>
                <span
                  className="ps-1 ms-1"
                  style={{ fontSize: "10px", color: "#808089" }}
                >
                  {book && book.quantity_sold ? book.quantity_sold.value : ""}
                </span>
                <span
                  className="border-start ps-2 ms-2"
                  style={{ fontSize: "10px", color: "#808089" }}
                >
                  {book && book.quantity_sold ? book.quantity_sold.text : ""}
                </span>
              </div>
              <div className="d-flex ms-2">
                <div className="d-flex">
                  <div style={{ fontSize: "20px", fontWeight: 600 }}>
                    {book && book.current_seller && book.current_seller.price
                      ? book.current_seller.price.toLocaleString("vi-VN") + "₫"
                      : "Giá không có"}
                  </div>
                </div>
                <div className="mt-1 ms-1">
                  <span
                    className="badge rounded-pill text-black"
                    style={{
                      backgroundColor: "#c1c6cd",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    -
                    {book &&
                      (
                        ((book.original_price - book.current_seller.price) /
                          book.original_price) *
                        100
                      ).toFixed(2)}
                    %
                  </span>
                </div>
              </div>
              <div
                className="mt-4 ms-2 mb-2"
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                Thông tin chi tiết
              </div>

              <div>
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td style={{ color: "#808089" }}>Phiên bản sách</td>
                      <td>Phiên bản thường</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Công ty phát hành</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "publisher_vn"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Ngày xuất bản</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "publication_date"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Kích thước</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "dimensions"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Dịch Giả</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "dich_gia"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Loại bìa</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "book_cover"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#808089" }}>Số trang</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "number_of_page"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                    <tr style={{ border: "white" }}>
                      <td style={{ color: "#808089" }}>Nhà xuất bản</td>
                      <td>
                        {book?.specifications[0]?.attributes.find(
                          (attr) => attr.code === "manufacturer"
                        )?.value || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="col">
                <div className="border border-0 rounded overflow-hidden">
                  <div
                    className="p-3 pb-0"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    Mô tả sản phẩm
                  </div>
                  <div className="p-3">
                    <img
                      className="object-fit-contain"
                      style={{ width: "100%", height: "100%" }}
                      src={book?.images[0]?.base_url}
                    />
                  </div>
                  <div className="p-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: book?.description || "N/A",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ height: "250px" }}
          className="row col-md-3 col-lg-3 d-sm "
        >
          <div className="card h-100 border">
            <span className="fw-bolder">Số Lượng</span>
            <nav aria-label="...">
              <ul className="pagination pagination-sm m-1 mx-3">
                <li className="page-item me-1 border">
                  <a
                    className="page-link text-secondary bg-secondary bg-opacity-10"
                    href="#"
                  >
                    -
                  </a>
                </li>
                <li className="page-item me-1 border " aria-current="page">
                  <span className="page-link text-dark">1</span>
                </li>
                <li className="page-item border ">
                  <a className="page-link text-secondary" href="#">
                    +
                  </a>
                </li>
              </ul>
            </nav>
            <span className="fw-bolder">Tạm tính</span>
            <div className="d-grid gap-2 mx-2">
              <button className="btn btn-danger" type="button">
                Mua ngay
              </button>
              <button className="btn btn-outline-primary" type="button">
                Thêm vào giỏ
              </button>
              <button className="btn btn-outline-primary mb-4" type="button">
                Mua trước trả sau
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BookDetail;
