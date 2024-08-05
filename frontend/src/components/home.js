// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte

function Home() {
  const { user} = useContext(AuthContext); // Utiliser le contexte

  return (
    <div>
      <a href='/login'> LOGIN </a>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-picture" />}
        </div>
      ) : (
        <div>Please log in to view your profile.</div>
      )}
    </div>
  );
}

export default Home;
