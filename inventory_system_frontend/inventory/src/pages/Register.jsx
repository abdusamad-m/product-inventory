import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';


function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        email: email,
        username: username,
        password: password
      });
      console.log(e.target.value)

      console.log('Response:', response);
  
      if (response.status === 200) {
        setMessage('Registration successful!');
        navigate('/login')
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during registration.');
    }
  };
  
  

  return (
  <div style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '20px',width:"400px",margin:"200px auto"}}>

    <div className="container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="usernamr"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
      <hr />
      <Link to={'/login'}>I Have Already Account</Link>
    </form>
    {message && <p>{message}</p>}
  </div>
  </div>
  
  );
}

export default Register;