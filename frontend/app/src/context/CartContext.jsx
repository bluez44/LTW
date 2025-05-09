import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.patch_id === product.patch_id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.patch_id === product.patch_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          patch_id: product.patch_id,
          name: product.name,
          price: product.price,
          img_url: product.img_url,
          quantity,
        },
      ];
    });
  };

  const updateCartItem = (patch_id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.patch_id === patch_id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (patch_id) => {
    setCart((prevCart) => prevCart.filter((item) => item.patch_id !== patch_id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};