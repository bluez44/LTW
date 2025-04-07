import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import '@/styles/Product.css';
import products from '@/data/inforProduct.jsx';
import cartIcon from '@/data/img/cart.jpg';

const Product = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

// Hàm hỗ trợ để tính số lượng sản phẩm trong giỏ
const getCartItemsWithQuantity = (cart) => {
  const cartMap = cart.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});
  return cart.map(item => ({
    ...item,
    quantity: cartMap[item.id],
  })).filter((item, index, self) => 
    index === self.findIndex(i => i.id === item.id)
  );
};

// Trang danh sách sản phẩm
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = () => {
    setShowCart(false);
    navigate('/checkout');
  };

  const cartItems = getCartItemsWithQuantity(cart);

  return (
    <div className="product-container">
      <h2>Danh sách sản phẩm</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={toggleCart} className="cart-toggle-btn">
          <img src={cartIcon} alt="Giỏ hàng" className="cart-icon" />
          <span className="cart-count">{cart.length}</span>
        </button>
        {showCart && (
          <div className="cart-dropdown">
            <h3>Giỏ hàng</h3>
            {cartItems.length > 0 ? (
              <>
                <ul className="cart-list">
                  {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                      <span>
                        {item.name} (x{item.quantity}) - {(item.price * item.quantity).toLocaleString()} VNĐ
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Xóa
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleCheckout} className="checkout-btn">
                  Thanh toán
                </button>
              </>
            ) : (
              <p>Giỏ hàng trống.</p>
            )}
          </div>
        )}
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Giá: {product.price.toLocaleString()} VNĐ</p>
                <div className="product-actions">
                  <Link to={`/products/product/${product.id}`} className="detail-btn">Xem chi tiết</Link>
                  <button onClick={() => addToCart(product)} className="cart-btn">Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

// Trang chi tiết sản phẩm
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const cartItems = getCartItemsWithQuantity(cart);

  if (!product) return <div>Sản phẩm không tồn tại</div>;

  return (
    <div className="product-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Giá: {product.price.toLocaleString()} VNĐ</p>
          <p>Danh mục: {product.category}</p>
          <div className="product-actions">
            <button onClick={addToCart} className="cart-btn">Thêm vào giỏ hàng</button>
            <button onClick={() => navigate('/products')} className="back-btn">Quay lại</button>
          </div>
        </div>
      </div>
      <h3>Giỏ hàng</h3>
      {cartItems.length > 0 ? (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} (x{item.quantity}) - {(item.price * item.quantity).toLocaleString()} VNĐ
            </li>
          ))}
        </ul>
      ) : (
        <p>Giỏ hàng trống.</p>
      )}
    </div>
  );
};

export default Product;