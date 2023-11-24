import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, adjustQuantity, clearCart } from "../../redux/slices/cart/cartSlice";
import "./Cart.css";

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-page-container">
      <div className="cart-container">
        <h2>SHOPPING BAG</h2>
        <div className="cart-header">
          <span>IN BAG ({totalQuantity})</span>
          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img className="cart-item-image" src={item.image} alt={item.title} />
            <div className="cart-item-details">
              <div className="cart-item-title-container">
                <h4 className="cart-item-title">{item.title}</h4>
                <button className="remove-item-button" onClick={() => dispatch(removeItemFromCart(item.id))}>
                  ×
                </button>
              </div>
              <p className="cart-item-price">{item.price} CAD</p>
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => dispatch(adjustQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                >
                  -
                </button>
                <span> Qty: {item.quantity} </span>
                <button
                  className="quantity-btn"
                  onClick={() => dispatch(adjustQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h4>Total Price</h4>
        <p>${totalPrice.toFixed(2)} CAD</p>
      </div>
    </div>
  );
};

export default Cart;
