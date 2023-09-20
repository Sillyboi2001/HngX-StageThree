import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleSearch = () => {
    onSearch(search);
  };

  const logout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
   }

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
      <div>
        <button 
          type="button" 
          className="logout"
          onClick={logout}
        ><FiLogOut /></button>
      </div>
    </nav>
  )
}

export default NavBar