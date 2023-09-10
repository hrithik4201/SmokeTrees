import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Register button clicked'); // Check if this message is logged
    try {
      // Make an HTTP POST request to the server to register the user
      const response = await axios.post(`${apiUrl}/register`, {
        username: username,
        email: email,
        password: password,
      });

      console.log(response);

      console.log(response.data.message);

      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div
      className='bg-image'
      style={{ backgroundImage: `url("./media/bg-image.jpg")` }}
    >
      <div className='form-container'>
        <div className='form-header'>
          <h1 className='title'>Welcome</h1>
          <span className='subtitle'>Let's begin a new adventure</span>
        </div>
        <form action='' className='form-content'>
          <div className='form-group'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='input'
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='input'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
          </div>

          <div className='form-group'>
            <label htmlFor='username' className='label'>
              Username
            </label>
            <input
              type='text'
              id='username'
              className='input'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
            />
          </div>

          <button className='form-btn' onClick={handleSubmit}>
            Register
          </button>
          <Link to='/' className='form-register'>
            Already have an account? Login here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
