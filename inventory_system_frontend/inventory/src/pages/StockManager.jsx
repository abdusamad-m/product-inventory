import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';


const StockManager = () => {
    const [productID, setProductID] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleStockChange = async (e, action) => {
        e.preventDefault();
        const url = action === 'add' 
            ? 'http://127.0.0.1:8000/api/stock/add/' 
            : 'http://127.0.0.1:8000/api/stock/remove/';
        
        try {
            const response = await axios.post(url, {
                product_id: productID,
                quantity: parseInt(quantity),
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.error : `Error ${action}ing stock`);
            setMessage('');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <h2 className="text-center mb-4">Manage Stock</h2>
            {message && <div className="alert alert-success text-center">{message}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title text-center">Stock Management</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="productID" className="form-label">Product ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productID"
                                value={productID}
                                onChange={(e) => setProductID(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={(e) => handleStockChange(e, 'add')}
                            >
                                Add Stock
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={(e) => handleStockChange(e, 'remove')}
                            >
                                Remove Stock
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default StockManager;
