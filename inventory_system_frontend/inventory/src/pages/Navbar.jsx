import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';  // Import custom CSS file

function NavigationBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = localStorage.getItem('customer_id'); // Check if user is logged in

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

  const handleSearch = () => {
    navigate(`/?search=${searchQuery}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container fluid>
        <Navbar.Brand href='/' className="custom-navbar-brand">
          Product Inventory System with Stock Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/productform">Add Product</Nav.Link>
            <Nav.Link href="/productlist">View Products</Nav.Link>
            <Nav.Link href="/stockmanager">Manage Stock</Nav.Link>
          </Nav>
          <Form className="d-flex">
            
            {isLoggedIn ? (
              <>
                <Button variant="outline-danger" className="me-2 custom-button" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="outline-danger" className="me-2 custom-button" onClick={customerLogin}>Login</Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
