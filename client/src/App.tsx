import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/user/Home/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/admin" element={<HomeAdmin></HomeAdmin>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/" element={<Home></Home>} />
        </Routes>
      </div>
  );
}

export default App;
