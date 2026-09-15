import { useState } from 'react';

export default function OrderPanel({ burger = {}, price = 0, onAddToOrder }) {
  const [quantity, setQuantity] = useState(1);

  const unitPrice = Number(price || burger.price || 0);
  const subtotal = unitPrice * quantity;

  const updateQuantity = (nextCount) => {
    setQuantity(Math.max(1, nextCount));
  };

  return (
    <div className="order-panel" aria-label={`${burger.name || 'Burger'} ordering panel`}>
      <div className="order-panel__quantity-row">
        <span className="order-panel__label">Quantity</span>

        <div className="order-panel__quantity-control">
          <button type="button" onClick={() => updateQuantity(quantity - 1)} aria-label="Decrease quantity">
            −
          </button>
          <span className="order-panel__quantity-value">{quantity}</span>
          <button type="button" onClick={() => updateQuantity(quantity + 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="order-panel__add-button"
        onClick={() => onAddToOrder?.({ ...burger, quantity, subtotal, price: unitPrice })}
      >
        Add to Order
      </button>

      <div className="order-panel__summary">
        <span>Subtotal</span>
        <strong>₱{subtotal.toFixed(0)}</strong>
      </div>
    </div>
  );
}
