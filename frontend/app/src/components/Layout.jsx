import React from 'react';
import { Outlet } from 'react-router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';

function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <ToastContainer />
      <main className="position-relative z-0 flex-grow-1 flex-shrink-1" style={{ padding: '81px 0 81px 0' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
