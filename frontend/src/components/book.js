// src/components/Home.js
import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../firebase/authContext'; // Importer le contexte

import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import wish from '../assets/img/wish.svg';



function Book() {

    const { id } = useParams();


    const [bookDetails, setBooksdetails] = useState([]);
    const [booksAuthor, setBooksAuthor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlistStatus, setWishlistStatus] = useState('');



    const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

    
  const { userId } = useContext(AuthContext); // Utiliser le contexte


  // RECHERCHE PAR ID DU LIVRE
  useEffect(() => {
    setLoading(true);
    axios.get(`${GOOGLE_BOOKS_API_URL}/${id}`, {
      params: {
        key: GOOGLE_BOOKS_API_KEY
      }
    })
    .then(response => {
      setBooksdetails(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching book details:', error);
      setLoading(false);
    });
  }, [id, GOOGLE_BOOKS_API_KEY]);



  // RECHERCHE PAR MEME AUTEUR 

  useEffect(() => {
    setLoading(true);
    axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: bookDetails.volumeInfo?.authors?.join(', '),
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
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
  }, [bookDetails?.volumeInfo?.authors, GOOGLE_BOOKS_API_KEY]);


// Fonction pour ajouter un livre aux favoris
const addBookToWishlist = async (bookId) => {
    try {
        const response = await axios.post('http://localhost:8001/api/wishlist', {
            user_id: userId,
            book_id: bookId,
            book_name: bookDetails.volumeInfo.title,
            book_pages: bookDetails.volumeInfo.pageCount,
            book_author: bookDetails.volumeInfo.authors?.join(', '),
            book_image: bookDetails.volumeInfo.imageLinks.thumbnail,
            book_description: bookDetails.volumeInfo.description
        });
        console.log('Response:', response.data);
        alert('Book added to wishlist');
    } catch (error) {
        console.error('Error adding book to wishlist:', error);
        alert('You need to be logged in to add books to your wishlist');
    }
};



  return (
    <div className='container-details'>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        bookDetails ? (
          <div className='book-details'>
            <div className='book-img-button'>
          
            {bookDetails.volumeInfo?.imageLinks && (
              <img 
                src={bookDetails.volumeInfo.imageLinks.thumbnail} 
                alt={bookDetails.volumeInfo.title} 
                className='book-cover-details'
              />
            )}

           <button className='button-wishlist'onClick={() => addBookToWishlist(bookDetails.id)}>
                            <img className='img-wishlist'src={wish} alt='Add wishlist'/>
                            <div className='tooltip'>Want to read</div>
                        </button>
                        {wishlistStatus === 'success' && <p>Book added to wishlist!</p>}
                        {wishlistStatus === 'error' && <p>Failed to add book to wishlist.</p>}
                   

            </div>


            <div className='book-details-info'>
              <h2>{bookDetails.volumeInfo?.title}</h2>
              <h3>
                  {bookDetails.volumeInfo?.authors?.map((author, index) => (
                    <Link key={index} to={`/author/${author}`} className='author-link'>
                      {author}
                    </Link>
                  ))}
                </h3>
            <p>{bookDetails.volumeInfo?.pageCount} Pages</p>
            <p>{bookDetails.volumeInfo?.description}</p>
          </div>
          </div>
        ) : (
          <div className='loading'>Book not found</div>
        )
      )}
      <div className='container-title'>
<h3 className='title'>More books by {bookDetails.volumeInfo?.authors[0]}</h3>
    </div>
    <div className='container-home-book'>
              {booksAuthor.length ? (
                booksAuthor.map(book => (
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




export default Book;