// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';


function Home() {

  
  const [booksCycle, setBooksCycle] = useState([]);
  const [booksMelanie, setBooksMelanie] = useState([]);
  const [booksJeff, setBooksJeff] = useState([]);

  const [queryCycle] = useState('cycle des robots isaac asimov');
  const [queryMelanie] = useState('Melanie da costa');
  const [queryJeff] = useState('The Descender Jeff Lemire');

  const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;


   // Effectuer la recherche pour le Cycle des Robots
   useEffect(() => {
    axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: queryCycle,
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
      }
    })
    .then(response => {
      setBooksCycle(response.data.items || []);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }, [queryCycle, GOOGLE_BOOKS_API_KEY]);


  // RECHERCHE MELANIE DA COSTA
  useEffect(() => {
    axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: queryMelanie,
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
      }
    })
    .then(response => {
      setBooksMelanie(response.data.items || []);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }, [queryMelanie, GOOGLE_BOOKS_API_KEY]);

  // RECHERCHE HISTOIRE

  useEffect(() => {
    axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: queryJeff,
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
      }
    })
    .then(response => {
      setBooksJeff(response.data.items || []);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  });


  return (
    <div className='container-home'>
      <div className='container-begin-home'>
     <h2>Track <span className='blue'>books</span> you've read</h2>
      <h2>Save those you want to read</h2>
      <button className='button-begin'>Get started</button>
      </div>
      <div className='container-title'>
      <h3 className='title'>Le Cycle des robots</h3>
      </div>
      <div className='container-home-book'>
        {booksCycle.length ? (
          booksCycle.map(book => (
            <Link to={`/book/${book.id}`} key={book.id} className='book-item'>
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

      <div className='container-title'>
      <h3 className='title'>Melanie Da Costa</h3>
      </div>
      <div className='container-home-book'>
        {booksMelanie.length ? (
          booksMelanie.map(book => (
            <Link to={`/book/${book.id}`} key={book.id} className='book-item'>
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

      <div className='container-title'>
      <h3 className='title'>Jeff Lemire</h3>
      </div>
      <div className='container-home-book'>
        {booksJeff.length ? (
          booksJeff.map(book => (
            <Link to={`/book/${book.id}`} key={book.id} className='book-item'>
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

export default Home;