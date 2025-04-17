import React, {useState} from 'react'


import { CiLock } from 'react-icons/ci';
import { LuEyeClosed, LuEye } from 'react-icons/lu';

import { register } from '../api';
import notify from '@/utils/functions/Notify';
import { useNavigate } from 'react-router';

function RegisterForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowRePassword, setIsShowRePassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('e.target', e.target);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
     
        const res = await register(data);

        console.log('res', res);

        notify(res.status, res.message);

        if (res.status === 201) {
            setTimeout(() => {
                navigate('/auth/login');
            }, 2000);
        }
    }

  return (
    <form 
        className="d-flex flex-column gap-4 w-100" 
        method='POST'
        onSubmit={handleSubmit}
    >
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Tên đăng nhập *
            </p>
            <input
                required
                name="user_name"
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
                    type={!isShowPassword ? 'password' : 'text'}
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

        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Nhập lại mật khẩu *
            </p>
            <div className="position-relative py-2">
                <input
                    required
                    name="rePassword"
                    className="outline-none border-none w-100 px-5 py-2"
                    type={!isShowRePassword ? 'password' : 'text'}
                    placeholder="Nhập lại mật khẩu"
                />
                <span className="position-absolute start-0 top-50 translate-middle-y text-vng-text">
                <CiLock size={24} />
                </span>
                <button
                    className="position-absolute end-0 top-50 translate-middle-y bg-transparent text-vng-text"
                    style={{ outline: 'none', border: 'none' }}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsShowRePassword(!isShowRePassword);
                    }}
                    tabIndex={-1}
                >
                    {isShowRePassword ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
                </button>
            </div>
        </div>

        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Email *
            </p>
            <input
                required
                name="email"
                className="outline-none border-none w-100 py-2"
                type="email"
                placeholder="Nhập email"
            />
        </div>
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Họ *
            </p>
            <input
                required
                name="last_name"
                className="outline-none border-none w-100 py-2"
                type="text"
                placeholder="Nhập họ"
            />
        </div>
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Tên *
            </p>
            <input
                required
                name="first_name"
                className="outline-none border-none w-100 py-2"
                type="text"
                placeholder="Nhập tên"
            />
        </div>
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Số điện thoại *
            </p>
            <input
                required
                name="phone_number"
                pattern="[0-9]{10}"
                className="outline-none border-none w-100 py-2"
                type="tel"
                placeholder="Nhập số điện thoại"
            />
        </div>
        <div className="position-relative py-3 px-4 border rounded-3 auth_input text-vng-text">
            <p className="position-absolute bg-white" style={{ top: '-10px', left: '10px' }}>
                Ngày sinh *
            </p>
            <input
                required
                name="birth_day"
                className="outline-none border-none w-100 py-2"
                type="date"
                placeholder="Nhập ngày sinh"
            />
        </div>
        <button
            className="btn btn-vng-third text-white py-4"
            type="submit"
            onClick={(e) => {
                console.log('clicked')
            }}
        >
            Đăng ký
        </button>
    </form>
  )
}

export default RegisterForm