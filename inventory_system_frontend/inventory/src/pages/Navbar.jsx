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
      const response = await axios.post('http://127.0.0.1:8000/customer/logout/', data, {
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
          <li>
            <a href="">view products</a>
          </li>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 custom-search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" className="me-2 custom-button" onClick={handleSearch}>Search</Button>
            {isLoggedIn ? (
              <Button variant="outline-danger" className="me-2 custom-button" onClick={handleLogout}>Logout</Button>
            ) : (
              
                <>
                  <Button variant="outline-danger" className="me-2 custom-button" onClick={customerLogin}> Login</Button>
                </>
              )
            }
            {isLoggedIn && <Button variant="outline-primary" className="custom-button" onClick={() => navigate('/profile')}>Profile</Button>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
