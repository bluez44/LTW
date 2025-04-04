import React from 'react';
import { ToastContainer } from 'react-toastify';

import ForgotForm from '@/ui/ForgotForm';
import ResetForm from '@/ui/ResetForm';

function ForgotPassword() {
  const [formState, setFormState] = React.useState('forgot');

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center">
        <div
          className="container d-flex flex-column justify-content-center align-items-center w-100"
          style={{ minHeight: '80dvh' }}
        >
          <div className="auth_container d-flex flex-column gap-3 align-items-center">
            <img
              src="https://cdn-gg.vnggames.app/id/0.4.55/static/media/zing.fe2d7db500abe00a92627d5c2152fea5.svg"
              width={100}
              alt="zing"
            />
            <p className="fs-4 fw-bold">Lấy lại mật khẩu với Zing ID</p>
            {formState === 'forgot' ? <ForgotForm setFormSate={setFormState} /> : <ResetForm />}
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-center w-100 login_footer"
          style={{ minHeight: '20dvh' }}
        >
          <p className="fs-6" style={{ color: '#767a7f' }}>
            Terms and conditions
          </p>
          <p className="fs-5" style={{ color: '#b9bdc1' }}>
            Copyright © 2022. VNGGames
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
