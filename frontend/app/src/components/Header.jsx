import React, { use, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import { Link, useNavigate } from 'react-router';

import { HiBars3 } from 'react-icons/hi2';
import { IoCloseSharp, IoLogOut } from 'react-icons/io5';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { logout } from '@/api';
import notify from '@/utils/functions/Notify';

import { getUserInfo } from '@/api';

import '@/styles/Header.css';

function Header() {
  const navigate = useNavigate();

  const [isShowMenu, setIsShowMenu] = useState(false);

  const [pageTheme, setPageTheme] = useState(localStorage.getItem('theme') || 'light');

  const items = [
    {
      name: 'Về VNG',
      link: '/about-us',
    },
    {
      name: 'Sản phẩm',
      link: '/products',
    },
    {
      name: 'Tin tức',
      link: '#',
    },
    {
      name: 'Hỏi đáp',
      link: '/faq',
    },
    {
      name: 'Liên hệ',
      link: '/contact',
    },
  ];
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isShowAction, setIsShowAction] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo();
      return res;
    };

    const res = fetchUser();
    console.log('res', res);

    res.then((res) => {
      if (res.status === 200) {
        setUserInfo(res.data.user);
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  window.addEventListener('click', (e) => {
    if (isShowAction) {
      setIsShowAction(false);
    }
  });

  useEffect(() => {
    const pathName = window.location.pathname;

    items.forEach((item, index) => {
      if (item.link === pathName) {
        setActiveIndex(index);
        document.title = `VNG - ${item.name}`;
      }
    });
  });

  return (
    <header className="shadow position-fixed top-0 left-0 w-100 z-3 bg-body">
      <nav className="d-flex justify-content-between align-items-center container nav_bar px-0">
        <div
          className="d-md-none"
          onClick={(e) => {
            setIsShowMenu(!isShowMenu);
          }}
        >
          <HiBars3 size={30} />
        </div>

        <Link
          className="d-inline-block position-md-relative position-absolute mx-auto mx-md-0 start-0 end-0"
          style={{ maxWidth: '60px' }}
          to="/"
          onClick={() => {
            setActiveIndex(-1);
            document.title = `VNG - Trang chủ`;
          }}
        >
          <span className="d-block" data-icon="vng">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 16.81">
              <g data-name="Layer 2">
                <path
                  fill="#e65a26"
                  d="M12.6 0v7.35a9.44 9.44 0 0 1-9.45 9.45H0V0h3.15v13.69a6.33 6.33 0 0 0 6.33-6.34V0Zm14.7 4.73V16.8h-3.15V4.72a1.57 1.57 0 0 0-1.58-1.57h-4.72V16.8H14.7V0h7.87a4.64 4.64 0 0 1 1.58.27A4.75 4.75 0 0 1 27 3.15a4.81 4.81 0 0 1 .3 1.58ZM34.64 10h4.2v2.1a1.58 1.58 0 0 1-1.58 1.58h-3.13a1.58 1.58 0 0 1-1.58-1.54v-7.4a1.57 1.57 0 0 1 1.57-1.57h5.78V0h-5.78a4.54 4.54 0 0 0-1.57.27 4.77 4.77 0 0 0-2.89 2.88 4.8 4.8 0 0 0-.26 1.58v7.33a4.85 4.85 0 0 0 .26 1.58 4.74 4.74 0 0 0 2.89 2.88 4.54 4.54 0 0 0 1.57.27h3.15a4.54 4.54 0 0 0 1.57-.27 4.72 4.72 0 0 0 2.89-2.88 4.84 4.84 0 0 0 .27-1.55V6.84h-7.36Z"
                  data-name="Layer 1"
                ></path>
              </g>
            </svg>
          </span>
        </Link>

        <ul
          className={`${isShowMenu ? 'd-block' : 'd-none'} mb-0 py-5 py-md-0 position-absolute top-100 start-0 position-md-static z-3 d-md-flex flex-column flex-md-row vh-100 h-md-100 bg-white w-100 w-md-auto list-unstyled fs-5 fs-md-6 fw-bold fw-md-normal justify-content-between align-items-start align-items-md-center`}
          onClick={(e) => {
            setIsShowMenu(false);
          }}
        >
          <span
            className="d-block d-md-none position-absolute top-0 end-0 p-3"
            onClick={(e) => {
              setIsShowMenu(!isShowMenu);
            }}
          >
            <IoCloseSharp />
          </span>
          {items.map((item, index) => (
            <li key={index}>
              <Link
                className={`${!isShowMenu && activeIndex == index ? 'active' : ''} position-relative lh-1 d-flex align-items-center justify-content-sm-center px-5 px-md-2 px-xl-4 w-100 text-md-vng-navbar text-black text-decoration-none bg-body`}
                style={{ height: '81px' }}
                to={item.link}
                onClick={(e) => {
                  setActiveIndex(index);
                  e.stopPropagation();
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={'/auth/login'}
              className="position-relative lh-1 d-flex align-items-center justify-content-sm-center px-5 px-md-2 px-xl-4 w-100 text-md-vng-navbar text-black text-decoration-none bg-body"
              style={{ height: '81px' }}
            >
              Đăng nhập
            </Link>
          </li>
        </ul>

        <div className="position-relative d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center h-100 gap-0 gap-md-3">
          {pageTheme === 'light' ? (
            <MdLightMode
              onClick={() => {
                setTheme('dark', true);
                setPageTheme('dark');
              }}
              className="fs-4"
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <MdDarkMode
              onClick={() => {
                setTheme('light', true);
                setPageTheme('light');
              }}
              className="fs-4"
              style={{ cursor: 'pointer' }}
            />
          )}
          {!userInfo ? (
            <Link
              to={'/auth/login'}
              className="d-none d-md-block btn btn-vng-primary text-white p-3"
              style={{ '--bs-btn-bg': '#e65a26' }}
            >
              Đăng nhập
            </Link>
          ) : (
            <>
              {userInfo?.avatar_url && (
                <img
                  src={`http://localhost:85/${userInfo?.avatar_url}`}
                  style={{ cursor: 'pointer' }}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShowAction(!isShowAction);
                  }}
                />
              )}
              <p
                className="header_user_info h-md-100 d-flex align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowAction(!isShowAction);
                }}
              >
                Xin chào {userInfo?.user_name}
              </p>
              {isShowAction && (
                <ul
                  style={{ width: '200%', maxWidth: 350 }}
                  className="header_user_action position-absolute bg-white p-3 z-3 top-100 top-md-70 end-0 d-flex flex-column list-unstyled rounded shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {userInfo?.avatar_url && (
                    <li className="text-center mb-4">
                      <img
                        src={`http://localhost:85/${userInfo?.avatar_url}`}
                        alt="avatar"
                        width={60}
                        height={60}
                        className="rounded-circle"
                      />
                    </li>
                  )}
                  <li>
                    <Link
                      className="text-decoration-none text-vng-text-user p-3 w-100 d-inline-block rounded-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsShowAction(false);
                      }}
                      to={'/profile'}
                    >
                      <MdOutlineManageAccounts size={24} />
                      <span className="ms-1">Trung tâm tài khoản</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none text-vng-text-user p-3 w-100 d-inline-block rounded-4"
                      onClick={async (e) => {
                        e.stopPropagation();

                        const res = await logout();

                        notify(res.status, res.message);

                        if (res.status === 200) {
                          localStorage.removeItem('user');
                          setUserInfo(null);
                          window.location.reload();
                        }
                      }}
                    >
                      <IoLogOut size={24} />
                      <span className="ms-1">Đăng xuất</span>
                    </Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
