import React, { useState } from 'react';
import { Link } from 'react-router';

function ResetForm() {
  return (
    <form action="" className="d-flex flex-column gap-4 w-100" method="POST">
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
          Mật khẩu mới *
        </p>
        <input
          name="username"
          className="outline-none border-none w-100 py-2"
          type="text"
          placeholder="Nhập mật khẩu mới của bạn"
        />
      </div>
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
          Nhập lại mật khẩu mới *
        </p>
        <input
          name="username"
          className="outline-none border-none w-100 py-2"
          type="text"
          placeholder="Nhập lại mật khẩu mới của bạn"
        />
      </div>
      <Link to={'/auth/login'} className="btn btn-vng-third text-white py-4" type="submit">
        Tiếp tục
      </Link>
    </form>
  );
}

export default ResetForm;
