import { Form } from "react-router-dom";
import { useState } from "react";
function Search({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("../../../public/db.json")
      .then((response) => response.json())
      .then((json) => {
        const results = json.books.filter((book) => {
          return (
            value &&
            book &&
            book.name &&
            book.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        console.log(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="form-control mx-3 flex-grow-1" style={{ width: "100%" }}>
        <form
          className="d-flex flex-grow-1 "
          onChange={(e) => handleSubmit(e.target.value)}
        >
          <img
            className="mx-2"
            style={{ width: "30px", height: "30px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
            alt="Search Icon"
          />
          <div className="input-group d-none d-lg-flex">
            <input
              name="search"
              className="form-control border-0 border-end"
              type="search"
              placeholder="Freeship đến 30K"
              aria-label="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              className="text-primary bg-white border-0 border-start"
              type="submit"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="input-group d-lg-none">
            <input
              className="form-control border-0"
              type="search"
              placeholder="Bạn đang tìm kiếm gì"
              aria-label="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
