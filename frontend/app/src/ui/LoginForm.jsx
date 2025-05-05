import React, { useContext, useState } from 'react';

import { CiLock } from 'react-icons/ci';
import { LuEyeClosed, LuEye } from 'react-icons/lu';

import { login } from '@/api';
import notify from '@/utils/functions/Notify';
import { useNavigate } from 'react-router';

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = {
    username: 'user',
    password: 'user',
  };

  const admin = {
    username: 'admin',
    password: 'admin',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // console.log('data', data);

    const res = await login(data);

    console.log('res', res);

    notify(res.status, res.message);

    if (res.status == 200) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleLogin} className="d-flex flex-column gap-4 w-100" method="POST">
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className={`bg-body position-absolute`} style={{ top: '-10px', left: '10px' }}>
          Tên đăng nhập/Email *
        </p>
        <input
          required
          name="username"
          id="username"
          className="outline-none bg-body border-none w-100 py-2"
          type="text"
          defaultValue={user.username}
          placeholder="Nhập tên đăng nhập hoặc email"
        />
      </div>
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className={`bg-body position-absolute`} style={{ top: '-10px', left: '10px' }}>
          Mật khẩu *
        </p>
        <div className="position-relative py-2">
          <input
            required
            name="password"
            id="password"
            className="outline-none bg-body border-none w-100 px-5 py-2"
            type={!isShowPassword ? 'password' : 'text'}
            defaultValue={user.password}
            placeholder="Nhập mật khẩu"
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
            tabIndex={-1}
          >
            {isShowPassword ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
          </button>
        </div>
      </div>
      <button className="btn btn-vng-third border-vng-third text-white py-4" type="submit" onClick={(e) => {}}>
        Tiếp tục
      </button>
    </form>
  );
}

export default LoginForm;
