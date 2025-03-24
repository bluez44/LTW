import React, { useState } from 'react';

import { CiLock } from 'react-icons/ci';
import { LuEyeClosed, LuEye } from 'react-icons/lu';
import { toast } from 'react-toastify';

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const notify = () => toast.error('Sai tài khoản hoặc mật khẩu!');

  return (
    <form action="" className="d-flex flex-column gap-4 w-100" method="POST">
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
          Tên đăng nhập *
        </p>
        <input
          required
          name="username"
          className="outline-none border-none w-100 py-2"
          type="text"
          placeholder="Nhập tên đăng nhập"
        />
      </div>
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
          Mật khẩu *
        </p>
        <div className="position-relative py-2">
          <input
            required
            name="password"
            className="outline-none border-none w-100 px-5 py-2"
            type={isShowPassword ? 'password' : 'text'}
            placeholder="Nhập tên đăng nhập"
          />
          <span className="position-absolute start-0 top-50 translate-middle-y text-vng-text">
            <CiLock size={24} />
          </span>
          <button
            className="position-absolute end-0 top-50 translate-middle-y bg-transparent text-vng-text"
            style={{ outline: 'none', border: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              setIsShowPassword(!isShowPassword);
            }}
          >
            {isShowPassword ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
          </button>
        </div>
      </div>
      <button
        className="btn btn-vng-third text-white py-4"
        type="submit"
        onClick={(e) => {
          notify();
        }}
      >
        Tiếp tục
      </button>
    </form>
  );
}

export default LoginForm;
