import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { getUserInfo, getAdminInfo } from './api';

// Components và Pages
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import Homepge from '@/pages/Homepge';
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/Forgot-password';
import AboutUs from '@/pages/AboutUs';
import FAQ from '@/pages/FAQ';
import Product from '@/pages/Product';

import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
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
import NotFound from '@/pages/NotFound';

// Component bảo vệ tuyến đường
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = requireAdmin ? await getAdminInfo() : await getUserInfo();
      if (userData.message === 'Get profile success') {
        setUser({
          id: userData.data.user.id,
          role: requireAdmin ? 'admin' : 'user',
        });
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [requireAdmin]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!user) {
    return <Navigate to={requireAdmin ? '/auth/admin/login' : '/auth/login'} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/auth/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Tuyến đường công khai với Layout người dùng */}
        <Route element={<Layout />}>
          <Route index element={<ErrorBoundary><Homepge /></ErrorBoundary>} />
          <Route path="/about-us" element={<ErrorBoundary><AboutUs /></ErrorBoundary>} />
          <Route path="/products/*" element={<ErrorBoundary><Product /></ErrorBoundary>} />
          <Route path="/faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
          <Route path="/contact" element={<ErrorBoundary><ContactUs /></ErrorBoundary>} />
          {/* <Route path="/cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />*/}
          <Route path="/checkout" element={<ErrorBoundary><Checkout /></ErrorBoundary>} />
          <Route path="/orders" element={<ErrorBoundary><Orders /></ErrorBoundary>} />
          <Route path="/profile" element={<ProtectedRoute><ErrorBoundary><Profile /></ErrorBoundary></ProtectedRoute>} />
          <Route path="/profile/reset" element={<ProtectedRoute><ErrorBoundary><ResetPassword /></ErrorBoundary></ProtectedRoute>} />
        </Route>

        {/* Tuyến đường quản trị với AdminLayout */}
        <Route element={<ProtectedRoute requireAdmin><ErrorBoundary><AdminLayout /></ErrorBoundary></ProtectedRoute>}>
          <Route path="/admin" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          <Route path="/admin/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
          <Route path="/admin/faq" element={<ErrorBoundary><FAQs /></ErrorBoundary>} />
          <Route path="/admin/news" element={<ErrorBoundary><News /></ErrorBoundary>} />
          <Route path="/admin/products" element={<ErrorBoundary><Products /></ErrorBoundary>} />
          <Route path="/admin/about-us" element={<ErrorBoundary><AboutUsAdmin /></ErrorBoundary>} />
        </Route>

        {/* Tuyến đường xác thực */}
        <Route path="/auth/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route path="/auth/reset" element={<ErrorBoundary><ForgotPassword /></ErrorBoundary>} />
        <Route path="/auth/register" element={<ErrorBoundary><Register /></ErrorBoundary>} />
        <Route path="/auth/admin/login" element={<ErrorBoundary><AdminLogin /></ErrorBoundary>} />

        {/* Trang lỗi 404 */}
        <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
      </Routes>
    </CartProvider>
  );
}

export default App;