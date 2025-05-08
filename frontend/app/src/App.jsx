import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router';

import Layout from '@/components/Layout';
import Homepge from '@/pages/Homepge';
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/Forgot-password';
import AboutUs from '@/pages/AboutUs';
import FAQ from '@/pages/FAQ';
import Product from '@/pages/Product';
import ContactUs from '@/pages/ContactUs';
import Profile from '@/pages/Profile';
import ResetPassword from '@/pages/ResetPassword';
import Register from '@/pages/auth/Register';
import AdminLogin from '@/pages/auth/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import Home from '@/pages/Admin/Home';
import Contact from '@/pages/Admin/Contact';
import FAQs from '@/pages/Admin/FAQs';
import News from '@/pages/Admin/News';
import Products from '@/pages/Admin/Products';
import AboutUsAdmin from '@/pages/Admin/AboutUsAdmin';
import HomepageManage from '@/pages/Admin/HomepageManage';
import ManageUser from '@/pages/Admin/ManageUser';

import RouteProtect from '@/components/RouteProtect';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepge />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products/*" element={<Product />} /> {/* Sử dụng wildcard để hỗ trợ sub-route */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/profile"
          element={
            <RouteProtect role="user">
              <Profile />
            </RouteProtect>
          }
        />
        <Route
          path="/profile/reset"
          element={
            <RouteProtect role="user">
              <ResetPassword />
            </RouteProtect>
          }
        />
      </Route>

      <Route
        element={
          <RouteProtect role="admin">
            <AdminLayout />
          </RouteProtect>
        }
      >
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/home" element={<HomepageManage />} />
        <Route path="/admin/contact" element={<Contact />} />
        <Route path="/admin/faq" element={<FAQs />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/about-us" element={<AboutUsAdmin />} />
        <Route path="/admin/users" element={<ManageUser />} />
      </Route>

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/reset" element={<ForgotPassword />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
