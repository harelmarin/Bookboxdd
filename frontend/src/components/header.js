// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import logIcon from '../assets/img/human.svg';
import searchIcon from '../assets/img/search.svg';


function Header() {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  

  const handleSearch = (event) => {
    event.preventDefault(); 
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); 
    }
}

  const { user, userId, handleGoogleSignIn, handleSignOut } = useContext(AuthContext); // Utiliser le contexte
  console.log(userId);

  return (
    <div className='container-header'>
        
      <a href='/'> <h1> Book<span className="blue">box</span> </h1></a> 
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text"
          placeholder="Search..."
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        </form>
      <img src={searchIcon} alt="Search Icon" className='search-icon' />

      {user ? (
         <div className='profile-container'>
         {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-picture" />}
         <div className='signout-container'>
         <Link to={`/dashboard/${userId}`}> <h3> Dashboard</h3></Link>
         <button onClick={handleSignOut} className='signout-button'>
            <h3> Disconnect</h3>
  </button>
</div>
       </div>
        ) : (
            <button onClick={handleGoogleSignIn} className='button-login'>
          <img src={logIcon} alt='Google Sign-In' />
        </button>
        )}

    </div>
  );
}

export default Header;
