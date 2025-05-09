import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [orderInfo, setOrderInfo] = useState({
    receiver_name: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        receiver_name: orderInfo.receiver_name,
        phone: orderInfo.phone,
        address: orderInfo.address,
        total_payment: totalAmount,
        items: cart.map((item) => ({
          patch_id: item.patch_id,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      const response = await createOrder(orderData);
      if (response.message === 'Tạo đơn hàng thành công') {
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/orders', {
          state: { orderSuccess: true, orderId: response.data.order_id },
        });
      } else {
        toast.error(response.message || 'Không thể đặt hàng');
      }
    } catch (error) {
      toast.error('Lỗi khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      <main className="checkout-main">
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999, top: '80px' }} />
        <div className="checkout-container">
          <h2 className="checkout-title">Thanh toán</h2>
          <div className="checkout-content">
            <div className="checkout-form-section">
              <h4 className="section-title">Thông tin giao hàng</h4>
              <form onSubmit={handleOrderSubmit} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="receiverName">Tên người nhận</label>
                  <input
                    type="text"
                    id="receiverName"
                    value={orderInfo.receiver_name}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, receiver_name: e.target.value })
                    }
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    value={orderInfo.phone}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, phone: e.target.value })
                    }
                    required
                    pattern="[0-9]{10}"
                    title="Số điện thoại phải có 10 chữ số"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <textarea
                    id="address"
                    value={orderInfo.address}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                    required
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="checkout-submit-button"
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                </button>
              </form>
            </div>
            <div className="checkout-cart-section">
              <h4 className="section-title">Giỏ hàng</h4>
              {cart.length === 0 ? (
                <p className="cart-empty">Giỏ hàng trống</p>
              ) : (
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.patch_id} className="cart-item">
                      <img
                        src={item.img_url || 'https://via.placeholder.com/50'}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h6 className="cart-item-name">{item.name}</h6>
                        <p className="cart-item-price">
                          {item.price.toLocaleString('vi-VN')} VNĐ x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="cart-total">
                    Tổng số tiền: {totalAmount.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;