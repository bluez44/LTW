import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosArrowRoundUp } from 'react-icons/io';

import '@/styles/Footer.css';
import FooterMenu from '@/components/FooterMenu';

function Footer() {
  return (
    <footer className="footer py-5 position-relative z-0">
      <div className="container px-0">
        <a href="#">
          <span className="d-block mb-3 mb-md-5" id="footer-vng" data-icon="vng">
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
        </a>
        <div className="row">
          <div className="col col-12 col-md-3">
            <FooterMenu
              title="Về VNG"
              items={[
                {
                  name: 'Sứ mệnh',
                  link: '#',
                },
                {
                  name: 'Giá trị cốt lõi',
                  link: '#',
                },
                {
                  name: 'Cột mốc chính',
                  link: '#',
                },
                {
                  name: 'Ban lãnh đạo cấp cao',
                  link: '#',
                },
              ]}
            />
          </div>

          <div className="col col-12 col-md-3">
            <FooterMenu
              title="Sản phẩm"
              items={[
                {
                  name: 'Trò chơi trực tuyến',
                  link: '#',
                },
                {
                  name: 'Zalo & AI',
                  link: '#',
                },
                {
                  name: 'Thanh toán và Tài chính',
                  link: '#',
                },
                {
                  name: 'VNG Pay',
                  link: '#',
                },
              ]}
            />
          </div>

          <div className="col col-12 col-md-3">
            <FooterMenu
              title="Tin tức"
              items={[
                {
                  name: 'Tin tức mới nhất',
                  link: '#',
                },
                {
                  name: 'Thư viện',
                  link: '#',
                },
              ]}
            />
          </div>

          <div className="col col-12 col-md-3">
            <FooterMenu title="Hỏi đáp" items={[]} />
          </div>
        </div>

        <hr />

        <div className="quick-link d-flex flex-column flex-xl-row justify-content-between align-items-center gap-xl-0 gap-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
            <p className="text-vng-text">© VNG Corporation. All rights reserved.</p>
            <div className="dot d-none d-md-block"></div>
            <a className="text-vng-text text-decoration-none" href="#">
              <span>VNG Brand Book</span>
            </a>
            <div className="dot d-none d-md-block"></div>
            <a className="text-vng-text text-decoration-none" href="#">
              <span>VNG Logo</span>
            </a>
            <div className="dot d-none d-md-block"></div>
            <a className="text-vng-text text-decoration-none" href="#">
              <span>Liên hệ</span>
            </a>
          </div>

          <div className="d-flex align-items-center justify-content-center flex-wrap gap-4">
            <a href="#" className="text-vng-secondary">
              <FaFacebookF size={24} className="text-vng-primary" />
            </a>
            <a href="#">
              <FaInstagram size={24} className="text-vng-primary" />
            </a>
            <a href="#">
              <FaYoutube size={24} className="text-vng-primary" />
            </a>
            <a href="#">
              <FaLinkedin size={24} className="text-vng-primary" />
            </a>
            <a
              href="#"
              className="d-flex align-items-center gap-2 text-decoration-none phone py-2 px-3 rounded-pill border bg-white"
            >
              <FaPhoneAlt size={24} className="text-vng-primary" />
              <span className="text-vng-text">(8428) - 3962 3888</span>
            </a>
          </div>
        </div>
      </div>
      <a 
        href='#' 
        className="d-none d-xl-flex scroll-btn text-white bg-vng-text-bold"
      >
        <IoIosArrowRoundUp size={40}/>
      </a>
    </footer>
  );
}

export default Footer;
