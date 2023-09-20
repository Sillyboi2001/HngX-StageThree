import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';

const NavBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <nav>
      <div className="brand">
        <h1 href="#">ARTFRAME</h1>
      </div>
      <div className="search">
          <input 
            type="text" 
            placeholder="Search for free photos" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            type="button" 
            className="search-btn"
            onClick={handleSearch}
          >
            <FiSearch />
          </button>
      </div>
    </nav>
  )
}

export default NavBar