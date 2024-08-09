import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/product/list/');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`http://127.0.0.1:8000${product.ProductImage}`}
                                className="card-img-top"
                                alt={product.ProductName}
                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.ProductName}</h5>
                                <p className="card-text">
                                    <strong>Product ID:</strong> {product.ProductID}<br />
                                    <strong>Product Code:</strong> {product.ProductCode}<br/>
                                    <strong>Product Stock:</strong> {product.TotalStock}

                                </p>
                                {product.variants.map((variant, index) => (
                                    <div key={index} className="mt-3">
                                        <h6 className="text-secondary">Variant: {variant.name}</h6>
                                        <ul className="list-unstyled">
                                            {variant.options.map((option, idx) => (
                                                <li key={idx} className="text-muted">{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default ProductList;
