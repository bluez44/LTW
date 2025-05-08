import React, { useLayoutEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { authUser } from '@/api';

function PrivateRoute({ children, role }) {
  if (!children) {
    return <Navigate to="/" />;
  }

  useLayoutEffect(() => {
    const auth = async () => {
      const res = await authUser();
      return res;
    };

    const res = auth();

    res.then((res) => {
      console.log('res', res, role);

      // console.log(res.data.role == role);
      if (res.status !== 200) {
        window.location.href = '/';
        return;
      }

      if (res.data.role !== role) {
        window.location.href = '/';
      }
    });
  }, []);

  return children;
}

export default PrivateRoute;
