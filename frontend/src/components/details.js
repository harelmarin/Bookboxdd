// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function Details() {

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q'); // Obtient la query de l'URL

    const [booksSearch, setBooksSearch] = useState([]);
    const [loading, setLoading] = useState(false);



    const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    
  const { user } = useContext(AuthContext); // Utiliser le contexte

 
 






  return (
    <div className='container-search'>
        
    </div>
  );
}

export default Details;