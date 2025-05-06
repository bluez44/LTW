import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import { getAdminInfo } from '../../api';

function AdminLayout() {
  const [isValid, setIsValid] = useState(false);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const res = await getAdminInfo();
      return res;
    };

    const res = fetchUser();

    res.then((res) => {
      console.log('res', res);

      if (res.status !== 200) {
        window.location.href = '/auth/admin/login';
      } else {
        setIsValid(true);
      }
    });
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <ToastContainer />
      <main className="position-relative z-0 flex-grow-1 flex-shrink-1">
        {isValid && (
          <>
            <Sidebar />
            <div id="main">
              <Outlet />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminLayout;
