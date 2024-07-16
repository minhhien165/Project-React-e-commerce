import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/user/Home/Home';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomeAdmin from './pages/admin/Home/HomeAdmin';
import Customer from './pages/admin/customer/Customer';
import CategoriesPage from './pages/admin/categories/CategoriesPage';
import Products from './pages/admin/product/Products';
import ProductDetail from './pages/user/product/ProductDetail';
import Cart from './pages/user/cart/Cart';
import { AuthProvider, useAuth } from './context/auth-context';
import HomePage from './pages/user/HomePage/HomePage';
import ProductList from './pages/user/product/ProductList';
import CheckoutPage from './pages/user/checkout/CheckoutPage';
import OrderManagementPage from './pages/admin/oders/OrderManagement';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
           <Route path="cart/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<HomeAdmin />}>
          <Route path="/admin/customers" element={<Customer />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<OrderManagementPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
