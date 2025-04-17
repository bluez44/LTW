import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import Homepge from '@/pages/Homepge'; 
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/Forgot-password';
import AboutUs from '@/pages/AboutUs';
import FAQ from '@/pages/FAQ';
import Product from '@/pages/Product';
import ContactUs from '@/pages/ContactUs';
import Register from '@/pages/auth/Register';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepge />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products/*" element={<Product />} /> {/* Sử dụng wildcard để hỗ trợ sub-route */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/reset" element={<ForgotPassword />} />
      <Route path='/auth/register' element={<Register />} />
    </Routes>
  );
}

export default App;