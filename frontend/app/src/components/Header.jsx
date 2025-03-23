import React from 'react'
import { CiSearch } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";

import '@/styles/Header.css'

function Header() {
  return (
    <header className='shadow position-fixed top-0 left-0 w-100 z-3 bg-white'>
      <nav className='d-flex justify-content-between align-items-center container nav_bar'>
        <a className='d-inline-block' style={{width: '60px'}} href="#">
          <span className="d-block" data-icon="vng"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 16.81"><g data-name="Layer 2"><path fill="#e65a26" d="M12.6 0v7.35a9.44 9.44 0 0 1-9.45 9.45H0V0h3.15v13.69a6.33 6.33 0 0 0 6.33-6.34V0Zm14.7 4.73V16.8h-3.15V4.72a1.57 1.57 0 0 0-1.58-1.57h-4.72V16.8H14.7V0h7.87a4.64 4.64 0 0 1 1.58.27A4.75 4.75 0 0 1 27 3.15a4.81 4.81 0 0 1 .3 1.58ZM34.64 10h4.2v2.1a1.58 1.58 0 0 1-1.58 1.58h-3.13a1.58 1.58 0 0 1-1.58-1.54v-7.4a1.57 1.57 0 0 1 1.57-1.57h5.78V0h-5.78a4.54 4.54 0 0 0-1.57.27 4.77 4.77 0 0 0-2.89 2.88 4.8 4.8 0 0 0-.26 1.58v7.33a4.85 4.85 0 0 0 .26 1.58 4.74 4.74 0 0 0 2.89 2.88 4.54 4.54 0 0 0 1.57.27h3.15a4.54 4.54 0 0 0 1.57-.27 4.72 4.72 0 0 0 2.89-2.88 4.84 4.84 0 0 0 .27-1.55V6.84h-7.36Z" data-name="Layer 1"></path></g></svg></span>
        </a>
        <ul className='d-flex h-100 list-unstyled fs-6 justify-content-between align-items-center'>
          <li className='h-100'><a className='active lh-1 d-flex align-items-center px-4 h-100 w-100 text-vng-navbar text-decoration-none' href="#">Về VNG</a></li>
          <li className='h-100'><a className='lh-1 d-flex align-items-center px-4 h-100 w-100 text-vng-navbar text-decoration-none' href="#">Sản phẩm</a></li>
          <li className='h-100'><a className='lh-1 d-flex align-items-center px-4 h-100 w-100 text-vng-navbar text-decoration-none' href="#">Tin tức</a></li>
          <li className='h-100'><a className='lh-1 d-flex align-items-center px-4 h-100 w-100 text-vng-navbar text-decoration-none' href="#">Hỏi đáp</a></li>
          <li className='h-100'><a className='lh-1 d-flex align-items-center px-4 h-100 w-100 text-vng-navbar text-decoration-none' href="#">Liên hệ</a></li>
        </ul>
        <div className='d-flex justify-content-between align-items-center h-100 gap-3'>
          <CiSearch size={30} />
            <div className="d-flex justify-content-center align-items-center gap-1">
              <MdLanguage size={30}/>
              <span className='fs-5 lh-1'>VI</span>
            </div>
        </div>
        
      </nav>
    </header>

  )
}

export default Header