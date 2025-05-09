import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="product-page">
          <div className="product-container">
            <h3 className="product-title">Đã xảy ra lỗi</h3>
            <p className="product-error">{this.state.error?.message || 'Vui lòng thử lại sau.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="add-to-cart-button"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;