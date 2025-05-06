import React, { useEffect, useState } from 'react';

import { getUserInfo, sendContactForm } from '@/api';
import notify from '@/utils/functions/Notify';

function ContactUs() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo();
      return res;
    };

    const res = fetchUser();
    // console.log('res', res);

    res.then((res) => {
      if (res.status === 200) {
        setUserInfo(res.data.user);
      } else {
        setUserInfo(null);
      }
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('data', data);

    const sendContact = async () => {
      const res = await sendContactForm(data);
      return res;
    };

    const res = sendContact();
    console.log('res', res);

    res.then((res) => {
      notify(res.status, res.message);
    });
  };

  return (
    <div className="container py-5">
      <p className="mb-5">
        Chúng tôi mong muốn lắng nghe ý kiến của quý khách. Vui lòng gửi mọi yêu cầu, thắc mắc theo thông tin bên dưới,
        chúng tôi sẽ liên lạc với bạn sớm nhất có thể
      </p>
      <form className="form w-100" method="POST" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Họ và tên <span className="text-danger">*</span>
          </label>
          <input
            name="full_name"
            required
            type="text"
            className="form-control"
            id="full_name"
            aria-describedby="full_name"
            placeholder="Nhập họ và tên"
            defaultValue={userInfo ? `${userInfo.last_name} ${userInfo.first_name}` : ''}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            name="email"
            required
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Nhập địa chỉ email"
            defaultValue={userInfo ? userInfo.email : ''}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNo" className="form-label">
            Số điện thoại <span className="text-danger">*</span>
          </label>
          <input
            name="phoneNo"
            required
            type="tel"
            className="form-control"
            id="phoneNo"
            aria-describedby="phoneNo"
            placeholder="Nhập số điện thoại"
            defaultValue={userInfo ? userInfo.phone_number : ''}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Nội dung <span className="text-danger">*</span>
          </label>
          <textarea
            name="content"
            required
            rows={10}
            type="text"
            className="form-control"
            id="content"
            aria-describedby="content"
            placeholder="Nội dung liên hệ"
          />
        </div>

        <button type="submit" className="text-uppercase btn btn-vng-primary text-white d-block mx-auto">
          gửi tin nhắn
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
