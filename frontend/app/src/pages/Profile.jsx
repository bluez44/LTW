import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { getUserInfo, updateProfile } from '@/api';
import notify from '@/utils/functions/Notify';

import avatar from '@/assets/user.jpg';

function Profile() {
  const navigate = useNavigate();
  const imgInput = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const [formInfor, setFormInfor] = useState(null);
  const [preview, setPreview] = useState(null);

  const isChange = useMemo(() => {
    return JSON.stringify(formInfor) !== JSON.stringify(userInfo);
  }, [formInfor, userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));

    setFormInfor({
      ...formInfor,
      [e.target.name]: file,
    });

    console.log(URL.createObjectURL(file));
  };

  const handleChangeInput = (e) => {
    setFormInfor({
      ...formInfor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('e.target', e.target);
    const formData = new FormData(e.target);

    formData.append('avatar_url', formInfor.avatar_url);

    const res = await updateProfile(formData);

    // console.log('res', res);

    notify(res.status, res.message);
  };

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
        setFormInfor(res.data.user);
      }
      else {
        navigate('/');
      }
    })
    .catch((err) => console.log('err', err));
  }, []);

  //   console.log('userInfo', userInfo);
  // console.log('formInfor', formInfor);

  return (
    formInfor && (
      <div className="container py-5">
        {formInfor && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="id" value={formInfor?.id} hidden readOnly className="d-none" />
            <div className="text-center">
              {formInfor?.avatar_url ? (
                <img
                  src={preview ? preview : `http://localhost:85/${formInfor?.avatar_url}`}
                  alt="avatar"
                  width={200}
                  height={200}
                  className="rounded-circle"
                  style={{ cursor: 'pointer', backgroundSize: 'contain' }}
                  onClick={() => imgInput.current.click()}
                />
              ) : (
                <img
                  src={preview ? preview : avatar}
                  alt="avatar"
                  width={200}
                  height={200}
                  className="rounded-circle"
                  style={{ cursor: 'pointer' }}
                  onClick={() => imgInput.current.click()}
                />
              )}
              <input
                ref={imgInput}
                name="avatar"
                className="mx-auto"
                type="file"
                accept="image/*"
                placeholder="Chọn ảnh đại diện của bạn"
                hidden
                onChange={handleFileChange}
              />
            </div>

            <div className="text-end">
              <Link to={'/profile/reset'}>Đổi mật khẩu</Link>
            </div>

            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">
                Tên người dùng
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="user_name"
                value={formInfor?.user_name}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Họ
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="last_name"
                value={formInfor?.last_name}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                Tên
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="first_name"
                value={formInfor?.first_name}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="email"
                value={formInfor?.email}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Số điện thoại
              </label>
              <input
                required
                type="tel"
                className="form-control"
                name="phone_number"
                value={formInfor?.phone_number}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birth_day" className="form-label">
                Ngày sinh
              </label>
              <input
                required
                type="date"
                className="form-control"
                name="birth_day"
                value={formInfor?.birth_day}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            {isChange && (
              <div className="w-100 text-end">
                <button type="submit" className="ms-auto btn btn-success">
                  Cập nhật thay đổi
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    )
  );
}

export default Profile;
