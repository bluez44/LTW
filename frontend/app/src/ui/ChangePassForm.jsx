import React, { useEffect, useState } from 'react';

import { CiLock } from 'react-icons/ci';
import { LuEyeClosed, LuEye } from 'react-icons/lu';
import { ToastContainer } from 'react-toastify';

import notify from '@/utils/functions/Notify';
import { changePassword } from '@/api';

function ChangePassForm() {
  const [isSame, setIsSame] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowReNewPassword, setIsShowReNewPassword] = useState(false);

  useEffect(() => {
    if (newPass === reNewPass && newPass !== '' && reNewPass !== '') {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [newPass, reNewPass]);

  const changePass = async (data) => {
    const res = await changePassword(data);
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('submitt')

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // console.log('data', data);

    const res = changePass(data);
    // console.log('res', res);

    res
      .then((res) => {
        notify(res.status, res.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <form className="d-flex flex-column gap-4 w-100" onSubmit={handleSubmit}>
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
          <p className="position-absolute bg-body" style={{ top: '-10px', left: '10px' }}>
            Mật khẩu hiện tại *
          </p>
          <div className="position-relative py-2">
            <input
              required
              name="current_pass"
              className="outline-none border-none bg-body w-100 px-5 py-2"
              type={!isShowPassword ? 'password' : 'text'}
              placeholder="Nhập mật khẩu hiện tại"
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

        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
          <p className="position-absolute bg-body" style={{ top: '-10px', left: '10px' }}>
            Nhập mật khẩu mới *
          </p>
          <div className="position-relative py-2">
            <input
              required
              name="new_pass"
              className="outline-none border-none bg-body w-100 px-5 py-2"
              type={!isShowNewPassword ? 'password' : 'text'}
              placeholder="Nhập mật khẩu mới"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <span className="position-absolute start-0 top-50 translate-middle-y text-vng-text">
              <CiLock size={24} />
            </span>
            <button
              className="position-absolute end-0 top-50 translate-middle-y bg-transparent text-vng-text"
              style={{ outline: 'none', border: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                setIsShowNewPassword(!isShowNewPassword);
              }}
              tabIndex={-1}
            >
              {isShowNewPassword ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
            </button>
          </div>
        </div>

        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
          <p className="position-absolute bg-body" style={{ top: '-10px', left: '10px' }}>
            Nhập lại mật khẩu mới *
          </p>
          <div className="position-relative py-2">
            <input
              required
              name="new_pass"
              className="outline-none border-none bg-body w-100 px-5 py-2"
              type={!isShowReNewPassword ? 'password' : 'text'}
              placeholder="Nhập mật khẩu mới"
              value={reNewPass}
              onChange={(e) => setReNewPass(e.target.value)}
            />
            <span className="position-absolute start-0 top-50 translate-middle-y text-vng-text">
              <CiLock size={24} />
            </span>
            <button
              className="position-absolute end-0 top-50 translate-middle-y bg-transparent text-vng-text"
              style={{ outline: 'none', border: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                setIsShowReNewPassword(!isShowReNewPassword);
              }}
              tabIndex={-1}
            >
              {isShowReNewPassword ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
            </button>
          </div>
        </div>

        <button
          disabled={!isSame}
          className={`btn btn-vng-third border-vng-third text-white py-4 ${isSame ? '' : 'opacity-50'}`}
          type="submit"
        >
          Thay đổi mật khẩu
        </button>
      </form>
    </>
  );
}

export default ChangePassForm;
