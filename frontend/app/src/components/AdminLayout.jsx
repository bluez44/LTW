import React from 'react';
import { Outlet } from 'react-router';

import { ToastContainer } from 'react-toastify';

function AdminLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <h1>Header</h1>
      <ToastContainer />
      <main className="position-relative z-0 flex-grow-1 flex-shrink-1" style={{ padding: '81px 0 81px 0' }}>
        <Outlet />
      </main>

      <h1>Footer</h1>
    </div>
  );
}

export default AdminLayout;
