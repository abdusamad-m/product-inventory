import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productID, setProductID] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [TotalStock, setStock] = useState(''); // New state variable for stock
    const [variants, setVariants] = useState([{ name: '', options: [''] }]);

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handleProductIDChange = (e) => setProductID(e.target.value);
    const handleProductCodeChange = (e) => setProductCode(e.target.value);
    const handleProductImageChange = (e) => setProductImage(e.target.files[0]);
    const handleStockChange = (e) => setStock(e.target.value); // New handler for stock

    const navigate = useNavigate()


    const handleVariantNameChange = (index, e) => {
        const newVariants = [...variants];
        newVariants[index].name = e.target.value;
        setVariants(newVariants);
    };

    const handleOptionChange = (variantIndex, optionIndex, e) => {
        const newVariants = [...variants];
        newVariants[variantIndex].options[optionIndex] = e.target.value;
        setVariants(newVariants);
    };

    const addVariant = () => setVariants([...variants, { name: '', options: [''] }]);
    const addOption = (variantIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].options.push('');
        setVariants(newVariants);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('ProductID', productID);
        formData.append('ProductCode', productCode);
        formData.append('TotalStock', TotalStock); // Adding stock to the formData
        formData.append('variants', JSON.stringify(variants));
        if (productImage) formData.append('ProductImage', productImage);
    
        const customer_id = localStorage.getItem('customer_id');
        formData.append('customer_id', customer_id);
    
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/product/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate('/productlist');
        } catch (error) {
            console.error("Error Response:", error);
            alert(error.response?.data?.error || "An error occurred while creating the product");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
                <h2 className="text-center mb-4">Create Product</h2>
                <div className="form-group mb-3">
                    <label>Product ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productID}
                        onChange={handleProductIDChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Product Code</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productCode}
                        onChange={handleProductCodeChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={handleProductNameChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Product Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleProductImageChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Stock</label> {/* New stock field */}
                    <input
                        type="number"
                        className="form-control"
                        value={TotalStock}
                        onChange={handleStockChange}
                        required
                    />
                </div>

                {variants.map((variant, variantIndex) => (
                    <div key={variantIndex} className="mb-4">
                        <h3 className="text-primary">Variant {variantIndex + 1}</h3>
                        <div className="form-group mb-2">
                            <label>Variant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={variant.name}
                                onChange={(e) => handleVariantNameChange(variantIndex, e)}
                                required
                            />
                        </div>
                        {variant.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="form-group mb-2">
                                <label>Option {optionIndex + 1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={option}
                                    onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-outline-secondary mb-3"
                            onClick={() => addOption(variantIndex)}
                        >
                            Add Option
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-outline-primary mb-3"
                    onClick={addVariant}
                >
                    Add Variant
                </button>
                <button type="submit" className="btn btn-success w-100">
                    Create Product
                </button>
            </form>
        </div>
        </>
    );
};

export default ProductForm;
