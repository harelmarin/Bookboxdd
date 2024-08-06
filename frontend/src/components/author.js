// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Author() {

    const { id } = useParams();

    const [booksAuthor, setBooksAuthor] = useState([]);
    const [loading, setLoading] = useState(false);



    const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    
  const { user } = useContext(AuthContext); // Utiliser le contexte

    // RECHERCHE PAR AUTEUR

    useEffect(() => {
        setLoading(true);
        axios.get(GOOGLE_BOOKS_API_URL, {
            params: {
            q: id,
            key: GOOGLE_BOOKS_API_KEY,
            maxResults: 10,
            }
        })
        .then(response => {
            setBooksAuthor(response.data.items || []);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            setLoading(false);
        });
        }
    );

  return (
    <div className='container-search'>

<div className='container-title'>
      <h3 className='title-author'>Books by {id} </h3>
      </div>
      <div className='container-search-book'>
        {booksAuthor.length ? (
          booksAuthor.map(book => (
            <Link to={`/book/${book.id}`} key={book.id} className='book-item top'>
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
            </Link>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>

    </div>



    

    

  );
}




export default Author;