import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: '' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessages({ ...errorMessages, general: 'Please fill in all required fields.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      console.log('User logged in successfully:', response.data);
      // Redirect to dashboard or protected route after successful login
      history.push('/dashboard'); // Redirect using React Router
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to log in. Please check your credentials.' });
    }
  };

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <p>Sign in with:</p>
          <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-link m-1" style={{ color: '#1266f1' }} href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <p className="text-center mt-3">or:</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {errorMessages.password && <div className="text-danger">{errorMessages.password}</div>}
        </div>

        {errorMessages.general && <div className="text-danger mb-3">{errorMessages.general}</div>}

        <button className="btn btn-primary mb-4 w-100">Sign in</button>
        <p className="text-center">Not a member? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default LoginPage;
