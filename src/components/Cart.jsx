import React from 'react';

export default function Cart({ items = [], onRemoveItem, compact = false }) {
  const total = items.reduce((sum, item) => {
    const subtotal = Number(item.subtotal ?? Number(item.price || 0) * Number(item.quantity || 0));
    return sum + subtotal;
  }, 0);

  return (
    <aside className={`cart${compact ? ' cart--compact' : ''}`} aria-label="Shopping cart">
      <h3 className="cart__title">Your Order</h3>

      {items.length === 0 ? (
        <p className="cart__empty">Your order is empty.</p>
      ) : (
        <div className="cart__items">
          {items.map((item, index) => {
            const subtotal = Number(item.subtotal ?? Number(item.price || 0) * Number(item.quantity || 0));

            return (
              <div key={`${item.name}-${index}`} className="cart__item">
                <div className="cart__item-info">
                  <h4>{item.name}</h4>
                  <p>
                    Qty: {item.quantity} · Price: ₱{Number(item.price || 0).toFixed(0)}
                  </p>
                </div>

                <div className="cart__item-controls">
                  <span className="cart__subtotal">₱{subtotal.toFixed(0)}</span>
                  <button
                    type="button"
                    className="cart__remove-button"
                    onClick={() => onRemoveItem?.(item.id ?? item.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart__total-row">
        <span>Total</span>
        <strong>₱{total.toFixed(0)}</strong>
      </div>
    </aside>
  );
}
