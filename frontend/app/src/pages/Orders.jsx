import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOrders } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        if (response.message === 'Get orders success') {
          setOrders(response.data);
        } else {
          setError(response.message || 'Không thể tải đơn hàng');
          toast.error(response.message || 'Không thể tải đơn hàng');
        }
      } catch (error) {
        setError('Lỗi khi tải đơn hàng');
        toast.error('Lỗi khi tải đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      toast.success('Đặt hàng thành công! Kiểm tra chi tiết đơn hàng dưới đây.');
    }
  }, [location.state]);

  return (
    <div className="orders-page">
      <Header />
      <main className="orders-main">
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999, top: '80px' }} />
        <div className="orders-container">
          <div className="orders-header">
            <h2>Đơn hàng của tôi</h2>
            <button
              onClick={() => navigate('/products')}
              className="back-to-products-button"
            >
              Quay lại cửa hàng
            </button>
          </div>
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : orders.length === 0 ? (
            <p className="empty-orders">Bạn chưa có đơn hàng nào</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className={`order-card ${location.state?.orderSuccess && order.order_id === location.state.orderId ? 'highlight' : ''}`}
                >
                  <h4>Đơn hàng #{order.order_id}</h4>
                  <p>Người nhận: {order.receiver_name}</p>
                  <p>Số điện thoại: {order.phone}</p>
                  <p>Địa chỉ: {order.address}</p>
                  <p>Trạng thái: {order.status}</p>
                  <p>Ngày đặt: {new Date(order.created_at).toLocaleString('vi-VN')}</p>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.patch_id} className="order-item">
                        <img
                          src={item.img_url || 'https://via.placeholder.com/50'}
                          alt={item.name}
                          className="order-item-image"
                        />
                        <div className="order-item-details">
                          <h6 className="order-item-name">{item.name}</h6>
                          <p className="order-item-price">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                          <p className="order-item-quantity">Số lượng: {item.quantity}</p>
                          <p className="order-item-subtotal">
                            Thành tiền: {(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="order-total">Tổng cộng: {order.total_payment.toLocaleString('vi-VN')} VNĐ</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;