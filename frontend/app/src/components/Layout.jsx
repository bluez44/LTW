import React from 'react';
import { Outlet } from 'react-router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <main className="position-relative z-0 flex-grow-1 flex-shrink-1" style={{ paddingTop: '81px' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
