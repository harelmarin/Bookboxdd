// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function Search() {

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q'); // Obtient la query de l'URL

    const [booksSearch, setBooksSearch] = useState([]);
    const [loading, setLoading] = useState(false);



    const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    
  const { user } = useContext(AuthContext); // Utiliser le contexte

 
 

  // Effectuer la recherche pour search 

useEffect(() => {
    setLoading(true);
    axios.get(GOOGLE_BOOKS_API_URL, {
        params: {
        q: query,
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 20,
        }
    })
    .then(response => {
        setBooksSearch(response.data.items || []);
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
    });
    }, [query, GOOGLE_BOOKS_API_KEY]);



  return (
    <div className='container-search'>
        <div className='container-title'>
        <h3 className='title'>Search Results for "{query}"</h3>
        </div>
        {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div className='container-search-book'>
        {booksSearch.length ? 
            (booksSearch.map(book => (
            <div key={book.id} className='book-item top'>
              {book.volumeInfo.imageLinks && (
                <img 
                  src={book.volumeInfo.imageLinks.thumbnail} 
                  alt={book.volumeInfo.title} 
                  className='book-cover'
                />
              )}
              <div className='book-info'>
               <h3>{book.volumeInfo.title}</h3>
               <p>{book.volumeInfo.authors?.join(', ')}</p>
               {book.volumeInfo.pageCount && (
              <p>{book.volumeInfo.pageCount} Pages</p>
              )}
               </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
        )}
    </div>
  );
}

export default Search;
