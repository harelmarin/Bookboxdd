// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte

import logIcon from '../assets/img/human.svg';
import searchIcon from '../assets/img/search.svg';


function Header() {
  const { user, handleGoogleSignIn, handleSignOut } = useContext(AuthContext); // Utiliser le contexte

  return (
    <div className='container-header'>
        
      <a href='/'> <h1> Book<span className="blue">box</span> </h1></a> 
      <input type="text" placeholder="Search..." className='search-input' />
      <img src={searchIcon} alt="Search Icon" className='search-icon' />

      {user ? (
         <div className='profile-container'>
         {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-picture" />}
         <div className='signout-container'>
         <a href='/'> <h3> Dashboard</h3></a>
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
