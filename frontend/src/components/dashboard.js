// src/components/Dashboard.js
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

function Dashboard() {

    const { userId } = useParams();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8001/dashboard/${userId}`)
                .then(response => {
                    setWishlist(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching wishlist:', error);
                    setLoading(false);
                });
        }
    }, [userId]);

    return (
        <div className='container-search'>
            <div className='container-title'>
                <h3 className='title'>Dashboard</h3>
            </div>
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div className='container-search-book'>
                    {wishlist.length ? (
                        wishlist.map((data, i) => (
                            <div key={i} className='book-item'>
                                <img src={data.book_image} alt={data.book_name} className='book-cover' />
                                <div className='book-info'>
                                    <h3>{data.book_name}</h3>
                                    <p>{data.book_author}</p>
                                    {data.book_pages && (
                                        <p>{data.book_pages} Pages</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No books in your wishlist</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
