import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { UserButton } from "@clerk/clerk-react";

const NavBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  console.log(search)

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
            placeholder="Search" 
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
      <UserButton />
    </nav>
  )
}

export default NavBar