// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useState } from 'react';
import { useEffect } from 'react';



function Search() {
  const { user } = useContext(AuthContext); // Utiliser le contexte

  return (
    <div>

    </div>
  );
}

export default Search;
