import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCart, updateCartItem, deleteCartItem } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total_payment: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCart();
        if (response.success && response.message === 'Get cart success') {
          setCart(response.data);
        } else {
          setError(response.message || 'Không thể tải giỏ hàng');
          toast.error(response.message || 'Không thể tải giỏ hàng');
        }
      } catch (error) {
        setError('Lỗi khi tải giỏ hàng');
        toast.error('Lỗi khi tải giỏ hàng');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (patch_id, quantity) => {
    if (quantity < 1) return;
    try {
      const response = await updateCartItem({ patch_id, quantity });
      if (response.success && response.message === 'Cập nhật giỏ hàng thành công') {
        setCart((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.patch_id === patch_id
              ? { ...item, quantity, subtotal: item.price * quantity }
              : item
          ),
          total_payment: prev.items.reduce(
            (sum, item) =>
              item.patch_id === patch_id
                ? sum + item.price * quantity
                : sum + item.subtotal,
            0
          ),
        }));
        toast.success('Cập nhật số lượng thành công!');
      } else {
        toast.error(response.message || 'Lỗi khi cập nhật số lượng');
      }
    } catch (error) {
      toast.error('Lỗi khi cập nhật số lượng');
    }
  };

  const handleRemoveItem = async (patch_id) => {
    try {
      const response = await deleteCartItem(patch_id);
      if (response.success && response.message === 'Xóa sản phẩm khỏi giỏ hàng thành công') {
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.patch_id !== patch_id),
          total_payment: prev.items
            .filter((item) => item.patch_id !== patch_id)
            .reduce((sum, item) => sum + item.subtotal, 0),
        }));
        toast.success('Xóa sản phẩm thành công!');
      } else {
        toast.error(response.message || 'Lỗi khi xóa sản phẩm');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow p-5">
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999, top: '80px' }} />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Giỏ hàng</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading ? (
            <p className="text-center text-gray-600">Đang tải...</p>
          ) : cart.items.length === 0 ? (
            <p className="text-center text-gray-600">Giỏ hàng trống.</p>
          ) : (
            <div>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                {cart.items.map((item) => (
                  <div
                    key={item.patch_id}
                    className="flex items-center border-b py-4 last:border-b-0"
                  >
                    <img
                      src={item.img_url || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">Giá: {item.price.toLocaleString('vi-VN')} VNĐ</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.patch_id, item.quantity - 1)}
                          className="bg-gray-300 px-2 py-1 rounded"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.patch_id, item.quantity + 1)}
                          className="bg-gray-300 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800 font-semibold">
                        {item.subtotal.toLocaleString('vi-VN')} VNĐ
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.patch_id)}
                        className="text-red-500 mt-2"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-right">
                <p className="text-lg font-semibold">
                  Tổng cộng: {cart.total_payment.toLocaleString('vi-VN')} VNĐ
                </p>
                <Link
                  to="/checkout"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 inline-block hover:bg-blue-600"
                >
                  Thanh toán
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;