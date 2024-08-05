// src/components/Login.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext.js'; // Importer le contexte

function Login() {
  const { user, handleGoogleSignIn, handleSignOut } = useContext(AuthContext); // Utiliser le contexte

  return (
    <div>
       <a href='/'> HOME </a>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-picture" />}
          <button onClick={handleSignOut} className='button-signout'>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleGoogleSignIn} className='button-login'>Sign in with Google</button>
      )}
    </div>
  );
}

export default Login;
