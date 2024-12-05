import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegistration.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import baseURL from './api';

const LoginRegistration = () => {
  const [action, setAction] = useState('');
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Utility functions for localStorage operations
  const setLocalStorageItem = (key, value) => {
    try {
      const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, serializedValue);
    } catch (err) {
      console.error(`Error setting ${key} in localStorage`, err);
    }
  };

  const removeLocalStorageItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage`, err);
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage', err);
    }
  };

  const registerLink = () => {
    setAction(' active');
    setError('');
  };

  const loginLink = () => {
    setAction('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!Email || !Password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${baseURL}User/Login?email=${Email}&pass=${Password}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json"
        }
      });

      const result = await response.json();
      console.log("Login API response:", result);

      if (response.ok) {
        // Store individual user data items
        setLocalStorageItem('Playerid', result.PlayerId);
        setLocalStorageItem('username', result.username);
        setLocalStorageItem('email', result.Email);
        // **Do not store the password in localStorage for security reasons**
        setLocalStorageItem('rank', result.Rank);
        setLocalStorageItem('avatar', result.Avator);

        console.log(`User data updated successfully. ${result.PlayerId}`);

        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!Email || !username || !Password) {
      setError('Please fill all fields');
      return;
    }

    const signupData = {
      email: Email,
      username: username,
      Password: Password,
      Rank: "1",
      Avator: "1"
    };

    try {
      const response = await fetch(`${baseURL}User/Signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      console.log("Signup API response:", result);

      if (response.ok) {
        // Store individual user data items
        setLocalStorageItem('Playerid', result.PlayerId);
        setLocalStorageItem('username', result.username);
        setLocalStorageItem('email', result.Email);
        // **Do not store the password in localStorage for security reasons**
        setLocalStorageItem('rank', result.Rank);
        setLocalStorageItem('avatar', result.Avator);

        console.log(`User data updated successfully. ${result.PlayerId}`);

        navigate('/avatar-selection');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`wrapper${action}`}>
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Email' 
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <FaEnvelope className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password' 
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />&emsp;Remember Me&emsp;&emsp;
            </label>
            <a href='#'>Forgot password?</a>
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account?</p><pre> </pre>
            <p><a href='#' onClick={registerLink}>Register here!</a></p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form onSubmit={handleSignup}>
          <h1>Registration</h1>
          {error && <div className="error-message">{error}</div>}
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type='email' 
              placeholder='Email' 
              value={Email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <FaEnvelope className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password' 
              value={Password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" required />I agree to terms & conditions
            </label>
          </div>
          <button type='submit'>Signup</button>
          <div className='register-link'>
            <p>Already have an account?<pre> </pre> <a href='#' onClick={loginLink}>Login here!</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegistration;
