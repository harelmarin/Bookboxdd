// src/components/Dashboard.js
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../firebase/authContext';

import { useParams } from 'react-router-dom';

function Dashboard() {

    const { id} = useParams();
    const { user} = useContext(AuthContext);


    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (id) {
            user.getIdToken().then(token => {
                console.log(token);
                axios.get(`http://localhost:8001/dashboard/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluez le token d'authentification
                    }
                })
                .then(response => {
                    setWishlist(response.data);
                    console.log('Fetched wishlist:', response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching wishlist:', error);
                    setLoading(false);
                });
            }).catch(error => {
                console.error('Error getting token:', error);
                setLoading(false);
            });
        }
    }, [id, user]);

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
