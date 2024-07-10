import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/user/Home/Home';
import HomePage from './pages/user/HomePage/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomeAdmin from './pages/admin/Home/HomeAdmin';
import Customer from './pages/admin/customer/Customer';
import CategoriesPage from './pages/admin/categories/CategoriesPage';
import Products from './pages/admin/product/Products';

function App() {
  return (
<div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<HomeAdmin />}>
          <Route path="/admin/customers" element={<Customer />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/products" element={<Products/>} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
