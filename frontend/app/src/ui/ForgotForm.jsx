import React, { useEffect } from 'react';
import generateSecureCaptcha from '@/utils/functions/AutoGenerateCaptcha';
import { toast } from 'react-toastify';

function ForgotForm({ setFormSate }) {
  useEffect(() => {
    setCaptCha(generateSecureCaptcha(4));
  }, []);
  const [captCha, setCaptCha] = React.useState('');
  const [userCaptcha, setUserCaptcha] = React.useState('');

  const notify = () => toast.error('Captcha không trùng khớp!');

  return (
    <form action="" className="d-flex flex-column gap-4 w-100" method="POST">
      <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
        <p className="position-absolute bg-body" style={{ top: '-10px', left: '10px' }}>
          Tên đăng nhập *
        </p>
        <input required name="username" className="w-100 bg-body py-2" type="text" placeholder="Nhập tên đăng nhập" />
      </div>
      {captCha && (
        <>
          <p>Captcha: {captCha}</p>
          <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <input
              required
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-100 bg-body py-2"
              type="text"
              placeholder="Nhập captcha"
            />
          </div>
        </>
      )}
      <button
        className="btn btn-vng-third border-vng-third text-white py-4"
        type="submit"
        onClick={(e) => {
          if (captCha === userCaptcha) {
            setFormSate('reset');
          } else notify();
        }}
      >
        Tiếp tục
      </button>
    </form>
  );
}

export default ForgotForm;
