import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password
    };

    try {
      // Make an HTTP POST request to the server
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("***********", response);
      // Check if the request was successful
      if (response.status === 200) {
        console.log(response)
        if (response.data.session_id) {
          console.log(response)

          localStorage.setItem('session_id', response.data.session_id)
          localStorage.setItem('customer_id', response.data.customer_id)
          window.location.href = '/Home';


        }
        // Handle successful login (e.g., redirect the user)

      } else {
        // Handle errors (e.g., display error message to the user)
        console.error('Login failed:', response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred while logging in:', error.message);
      // Display error message to the user
    }
  };

  return (
    <>

      <div className='page'>
        <div style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '20px', width: "400px", margin: "200px auto", }}>

          <div className='container'>
            <h2 className="mt-5">Login</h2>
            <Form className="incontainer" onSubmit={handleSubmit} style={{ backgroundColor: 'transparent' }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              </Form.Group>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                marginTop: '10px',
                alignItems: 'center'
              }}>
                <Button variant="primary" type="submit" style={{ width: '50%' }}>
                  Submit
                </Button>
                <hr style={{ width: '100% ' }} />
                <Link to='/register'>Create Account</Link>
              </div>

            </Form>

          </div>
        </div>
      </div>
    </>



  );
};

export default Login;
