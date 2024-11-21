import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input className="form-control rounded-0 rounded-start" type="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button className="btn btn-dark rounded-0 rounded-end" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
