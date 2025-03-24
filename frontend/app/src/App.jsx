import {} from 'react';
import './App.css';
import { Routes, Route } from 'react-router';

import Layout from '@/components/Layout';
import Homepge from '@/pages/Homepge';
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/Forgot-password';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepge />} />
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/reset" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
