import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Trang không tìm thấy</h1>
      <p>Xin lỗi, trang bạn đang tìm không tồn tại.</p>
      <Link to="/" className="btn btn-primary">
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFound;