import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get('userId');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/save-address`, {
        userId: userId,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
      });

      console.log(response);

      if (response.status === 200) {
        // On successful submission, set the success state to true
        setSuccess(true);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Make an HTTP POST request to log the user out
      const response = await axios.post(`${apiUrl}/logout`);
      if (response.status === 200) {
        setSuccess(false);
        navigate('/');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div
      className='bg-image'
      style={{ backgroundImage: `url("./media/bg-image2.jpg")` }}
    >
      <div className='form-container'>
        <div className='form-header'>
          <h1 className='title'>Enter Your Address</h1>
        </div>

        {/* Conditional rendering based on success state */}
        {success ? (
          <div>
            <p>Address submitted successfully!</p>
            <button onClick={handleLogout} className='form-btn'>
              Logout
            </button>
          </div>
        ) : (
          <form action='' className='form-content' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='street' className='label'>
                Street
              </label>
              <input
                type='text'
                id='street'
                className='input'
                placeholder='Enter your street'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='city' className='label'>
                City
              </label>
              <input
                type='text'
                id='city'
                className='input'
                placeholder='Enter your city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='state' className='label'>
                State
              </label>
              <input
                type='text'
                id='state'
                className='input'
                placeholder='Enter your state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='postalCode' className='label'>
                Pincode
              </label>
              <input
                type='text'
                id='postalCode'
                className='input'
                placeholder='Enter your pincode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <button type='submit' className='form-btn'>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
