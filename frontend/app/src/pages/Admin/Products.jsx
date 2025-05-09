import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/ProductsAdmin.css';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    img_url: '',
    price: '',
    exchange_amount: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      if (productsData.success && productsData.message === 'Get products success') {
        setProducts(productsData.data);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      img_url: formData.img_url,
      price: parseFloat(formData.price),
      exchange_amount: parseInt(formData.exchange_amount),
    };

    const result = isEditing
      ? await updateProduct(formData.id, productData)
      : await addProduct(productData);

    if (result.success && result.message === (isEditing ? 'Update product success' : 'Add product success')) {
      toast.success(isEditing ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
      setFormData({ id: null, name: '', description: '', img_url: '', price: '', exchange_amount: '' });
      setIsEditing(false);
      const productsData = await getProducts();
      if (productsData.success && productsData.message === 'Get products success') {
        setProducts(productsData.data);
      }
    } else {
      toast.error(result.message || 'Lỗi khi xử lý sản phẩm');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      img_url: product.img_url,
      price: product.price,
      exchange_amount: product.exchange_amount,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result.success && result.message === 'Delete product success') {
      toast.success('Xóa sản phẩm thành công!');
      setProducts(products.filter((p) => p.id !== id));
    } else {
      toast.error(result.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  return (
    <div className="products-admin-container">
      <ToastContainer />
      <h2>Quản lý sản phẩm</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <h3>{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Mô tả"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="URL hình ảnh"
          value={formData.img_url}
          onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Giá (VNĐ)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Số lượng tồn kho"
          value={formData.exchange_amount}
          onChange={(e) => setFormData({ ...formData, exchange_amount: e.target.value })}
          required
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'Cập nhật' : 'Thêm'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setFormData({
                id: null,
                name: '',
                description: '',
                img_url: '',
                price: '',
                exchange_amount: '',
              }) && setIsEditing(false)
            }
          >
            Hủy
          </button>
        )}
      </form>
      <h3>Danh sách sản phẩm</h3>
      {products.length > 0 ? (
        <ul className="products-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.img_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
              <span>
                {product.name} - {product.price.toLocaleString()} VNĐ (Tồn kho: {product.exchange_amount})
              </span>
              <div>
                <button onClick={() => handleEdit(product)} className="btn btn-primary">
                  Sửa
                </button>
                <button onClick={() => handleDelete(product.id)} className="remove-btn">
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Products;