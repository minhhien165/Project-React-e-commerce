import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/UserInterface';
import { RegisterFormData } from '../../interfaces/RegisterFormData';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    fullname: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    fullname: '',
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

    if (!formData.username || !formData.email || !formData.fullname || !formData.password) {
      setErrorMessages({ ...errorMessages, general: 'Please fill in all required fields.' });
      return;
    }

    try {
      const existingUser = await axios.get(`http://localhost:8080/users?username=${formData.username}`);
      if (existingUser.data.length > 0) {
        setErrorMessages({ ...errorMessages, username: 'Username already exists. Please choose another one.' });
        return;
      }

      const newUser: Omit<User, 'id'> = {
        ...formData,
        status: 'active',
        role: 'user',
        avatar: '',
        phone: '',
        address: '',
        created_at: new Date().toLocaleDateString('vi-VN'),
        updated_at: new Date().toLocaleDateString('vi-VN'),
      };

      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log('User registered successfully:', response.data);
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to register. Please try again later.' });
    }
  };

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </div>
  );
}

export default RegisterPage;
