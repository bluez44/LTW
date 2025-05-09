import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cartIcon from '../data/img/cart.jpg';
import '../styles/Product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        return Array.isArray(parsedCart) ? parsedCart : [];
      }
      return [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showManageProduct, setShowManageProduct] = useState(false);
  const [manageMode, setManageMode] = useState(''); // 'add', 'delete', 'edit'
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    exchange_amount: '',
    img_url: '',
  });
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        if (response.message === 'Get products success') {
          setProducts(response.data);
        } else {
          setError(response.message || 'Không thể tải sản phẩm');
          toast.error(response.message || 'Không thể tải sản phẩm');
        }
      } catch (error) {
        setError('Lỗi khi tải sản phẩm');
        toast.error('Lỗi khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      const existingItem = cartArray.find((item) => item.patch_id === product.patch_id);
      if (existingItem) {
        return cartArray.map((item) =>
          item.patch_id === product.patch_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...cartArray,
        {
          patch_id: product.patch_id,
          name: product.name,
          price: product.price,
          img_url: product.img_url,
          quantity: 1,
        },
      ];
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const updateQuantity = (patch_id, delta) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.map((item) =>
        item.patch_id === patch_id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
    });
  };

  const removeFromCart = (patch_id) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.filter((item) => item.patch_id !== patch_id);
    });
    toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct(newProduct);
      if (response.message === 'Thêm sản phẩm thành công') {
        toast.success('Thêm sản phẩm thành công!');
        setShowManageProduct(false);
        setNewProduct({
          name: '',
          description: '',
          price: '',
          exchange_amount: '',
          img_url: '',
        });
        const productsResponse = await getProducts();
        if (productsResponse.message === 'Get products success') {
          setProducts(productsResponse.data);
        }
      } else {
        toast.error(response.message || 'Không thể thêm sản phẩm');
      }
    } catch (error) {
      toast.error('Lỗi khi thêm sản phẩm');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      const response = await deleteProduct(id);
      if (response.message === 'Xóa sản phẩm thành công') {
        toast.success('Xóa sản phẩm thành công!');
        const productsResponse = await getProducts();
        if (productsResponse.message === 'Get products success') {
          setProducts(productsResponse.data);
        }
      } else {
        toast.error(response.message || 'Không thể xóa sản phẩm');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(editProduct.id, editProduct);
      if (response.message === 'Cập nhật sản phẩm thành công') {
        toast.success('Chỉnh sửa sản phẩm thành công!');
        setShowManageProduct(false);
        setEditProduct(null);
        const productsResponse = await getProducts();
        if (productsResponse.message === 'Get products success') {
          setProducts(productsResponse.data);
        }
      } else {
        toast.error(response.message || 'Không thể chỉnh sửa sản phẩm');
      }
    } catch (error) {
      toast.error('Lỗi khi chỉnh sửa sản phẩm');
    }
  };

  const selectEditProduct = (product) => {
    setEditProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      exchange_amount: product.exchange_amount,
      img_url: product.img_url,
    });
    setManageMode('edit');
  };

  const totalAmount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="product-page">
      <Header />
      <main className="product-main">
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999, top: '80px' }} />
        <div className="product-container">
          <div className="product-header">
            <Link to="/orders" className="orders-button">
              Đơn hàng của tôi
            </Link>
            <button
              onClick={() => setShowCart(true)}
              className="cart-button"
            >
              <img src={cartIcon} alt="Giỏ hàng" className="cart-icon" />
              {Array.isArray(cart) && cart.length > 0 && (
                <span className="cart-count">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
          {loading ? (
            <p>Đang tải sản phẩm...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.img_url || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price.toLocaleString('vi-VN')} VNĐ</p>
                  <p className="product-quantity">Số lượng: {product.exchange_amount}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart-button"
                    disabled={product.exchange_amount === 0}
                  >
                    {product.exchange_amount === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="manage-product-footer">
            <button
              onClick={() => setShowManageProduct(true)}
              className="manage-product-button"
            >
              Quản lý sản phẩm
            </button>
          </div>
          {showCart && (
            <div className="cart-modal-overlay">
              <div className="cart-modal">
                <h4 className="cart-modal-title">Giỏ hàng</h4>
                {Array.isArray(cart) && cart.length === 0 ? (
                  <p className="cart-empty">Giỏ hàng trống</p>
                ) : (
                  <div className="cart-items">
                    {Array.isArray(cart) &&
                      cart.map((item) => (
                        <div key={item.patch_id} className="cart-item">
                          <img
                            src={item.img_url || 'https://via.placeholder.com/50'}
                            alt={item.name}
                            className="cart-item-image"
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                          />
                          <div className="cart-item-details">
                            <h6 className="cart-item-name">{item.name}</h6>
                            <p className="cart-item-price">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                            <div className="cart-item-quantity">
                              <button
                                onClick={() => updateQuantity(item.patch_id, -1)}
                                className="quantity-button"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.patch_id, 1)}
                                className="quantity-button"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.patch_id)}
                              className="remove-item-button"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                    <div className="cart-total">
                      <p>Tổng cộng: {totalAmount.toLocaleString('vi-VN')} VNĐ</p>
                      <button
                        onClick={() => {
                          setShowCart(false);
                          navigate('/checkout');
                        }}
                        className="checkout-button"
                      >
                        Thanh toán
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setShowCart(false)}
                  className="close-cart-button"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
          {showManageProduct && (
            <div className="manage-product-modal-overlay">
              <div className="manage-product-modal">
                <h4 className="manage-product-title">Quản lý sản phẩm</h4>
                <div className="manage-product-options">
                  <button
                    onClick={() => setManageMode('add')}
                    className="manage-option-button"
                  >
                    Thêm sản phẩm
                  </button>
                  <button
                    onClick={() => setManageMode('delete')}
                    className="manage-option-button"
                  >
                    Xóa sản phẩm
                  </button>
                  <button
                    onClick={() => setManageMode('edit')}
                    className="manage-option-button"
                  >
                    Chỉnh sửa sản phẩm
                  </button>
                </div>
                {manageMode === 'add' && (
                  <form onSubmit={handleAddProduct} className="manage-product-form">
                    <input
                      type="text"
                      placeholder="Tên sản phẩm"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Mô tả sản phẩm"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Giá (VNĐ)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Số lượng tồn kho"
                      value={newProduct.exchange_amount}
                      onChange={(e) => setNewProduct({ ...newProduct, exchange_amount: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="URL hình ảnh"
                      value={newProduct.img_url}
                      onChange={(e) => setNewProduct({ ...newProduct, img_url: e.target.value })}
                      required
                    />
                    <button type="submit" className="submit-button">
                      Thêm sản phẩm
                    </button>
                  </form>
                )}
                {manageMode === 'delete' && (
                  <div className="delete-product-list">
                    {products.map((product) => (
                      <div key={product.id} className="delete-product-item">
                        <span>{product.name}</span>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="delete-product-button"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {manageMode === 'edit' && (
                  <div className="edit-product-list">
                    {editProduct ? (
                      <form onSubmit={handleEditProduct} className="manage-product-form">
                        <input
                          type="text"
                          placeholder="Tên sản phẩm"
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                          required
                        />
                        <textarea
                          placeholder="Mô tả sản phẩm"
                          value={editProduct.description}
                          onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Giá (VNĐ)"
                          value={editProduct.price}
                          onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Số lượng tồn kho"
                          value={editProduct.exchange_amount}
                          onChange={(e) => setEditProduct({ ...editProduct, exchange_amount: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="URL hình ảnh"
                          value={editProduct.img_url}
                          onChange={(e) => setEditProduct({ ...editProduct, img_url: e.target.value })}
                          required
                        />
                        <button type="submit" className="submit-button">
                          Lưu thay đổi
                        </button>
                        <button
                          onClick={() => setEditProduct(null)}
                          className="cancel-button"
                        >
                          Hủy
                        </button>
                      </form>
                    ) : (
                      products.map((product) => (
                        <div key={product.id} className="edit-product-item">
                          <span>{product.name}</span>
                          <button
                            onClick={() => selectEditProduct(product)}
                            className="edit-product-button"
                          >
                            Chỉnh sửa
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowManageProduct(false);
                    setManageMode('');
                    setEditProduct(null);
                  }}
                  className="close-manage-button"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;