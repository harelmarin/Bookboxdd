// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';


function Home() {
  const { user} = useContext(AuthContext); // Utiliser le contexte

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: 'cycle des robots isaac asimov',
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
      }
    })
    .then(response => {
      setBooks(response.data.items || []);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }, [GOOGLE_BOOKS_API_KEY]);

  return (
    <div className='container-home'>
      <div className='container-begin-home'>
     <h2>Track <span className='blue'>books</span> you've read</h2>
      <h2>Save those you want to read</h2>
      <button className='button-begin'>Get started</button>
      </div>
      <div className='container-home-book'>
        {books.length ? (
          books.map(book => (
            <div key={book.id} className='book-item'>
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
     
    </div>
  );
}

export default Home;