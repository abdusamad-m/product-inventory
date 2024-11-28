import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductFrom';
import ProductList from './ProductList';
import StockManager from './StockManager';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Home() {
    const [page, setPage] = useState('listProduct');
    const certificatesRef = useRef(null);
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('customer_id');

    const scrollToSection = () => {
        if (certificatesRef.current) {
            certificatesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const customerLogin = () => {
        navigate('/login');
    };

    const data = {
        sessionKey: localStorage.getItem('session_id')
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('session_id');
                localStorage.removeItem('customer_id');
                navigate('/login');
            } else {
                console.error('Logout failed:', response.data.error);
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred while logging out:', error.message);
            alert('An error occurred while logging out. Please try again.');
        }
    };

    return (
        <>
            <div className='page2'>
                <div style={{ height: '100%', width: '90%', overflow: 'scroll', scrollbar: 'none', scrollbarWidth: 'none' }}>
                    {page === 'addProduct' && <ProductForm />}
                    {page === 'listProduct' && <ProductList />}
                    {page === 'manageStock' && <StockManager />}
                </div>

                <div style={{ width: '10%' }}>
                    <div className="navbar1">
                        <div className='navbar1' style={{ height: '300px' }}>

                            <button onClick={() => setPage('addProduct')} className="icon-button">
                                <i className="bi bi-database-add"></i>
                                <span className="button-text">Add Product</span>
                            </button>
                            <button onClick={() => setPage('listProduct')} className="icon-button">
                                <i className="bi bi-list"></i>
                                <span className="button-text">List Product</span>
                            </button>
                            <button onClick={() => setPage('manageStock')} className="icon-button">
                                <i className="bi bi-pencil-square"></i>
                                <span className="button-text">Manage</span>
                            </button>
                        </div>




                        {isLoggedIn ? (
                            <button className="icon-button" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span className="button-text">Logout</span>
                            </button>
                        ) : (
                            <button className="icon-button" onClick={customerLogin}>
                                <i class="bi bi-person"></i>
                                <span className="button-text">Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
}

export default Home;
