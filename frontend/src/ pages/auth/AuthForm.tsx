import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Import the shared CSS styles
import { redirect } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'signup') {
      console.log(mode);
      const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:3001/createuser', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Sign Up', { username, password });
    // try {
    //   const response = await axios.post('http://localhost:3001/createuser', {
    //       username,
    //       password
    //     }
    //   );

      setMessage(`User created successful for user: ${response.data.username}`);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');
    }
      console.log('signup', { username, password });
    } 
    else if( mode === "login") {
      // Handle login up logic here
      console.log(mode);
      const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password
    );
    try { 
      const response = await axios.post('http://localhost:3001/loginuser', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.status === 200) {
        localStorage.setItem("username", username);
      }
      console.log('Login', { username, password });
      setMessage(`User logged in successfully for user: ${response.data.username}`);
      setTimeout(() => {
      window.location.href = '/';
      }, 1000);
      setUsername('');
      setPassword('');
    }
      catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');

      }

    }
  };



  return (
    <div className="form-container">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
      {message && <p>{message}</p>}

      <p onClick={handleSwitchMode}>
        {mode === 'login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default AuthForm;

