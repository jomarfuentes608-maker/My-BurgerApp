import { useEffect, useState } from 'react';
import Cart from './Cart';
import BurgerGallery from './BurgerGallery';

export default function BurgerDetails({
  burger,
  onClose,
  children,
  cartItems = [],
  onRemoveItem,
  onToggleFavorite,
  isFavorite = false,
  quantity = 1,
  onQuantityChange,
  onAddToOrder,
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [burger?.id]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [burger?.id]);

  if (!burger) {
    return null;
  }

  const handleQuantityChange = (delta) => {
    const nextQuantity = Math.max(1, Number(quantity || 1) + delta);
    onQuantityChange?.(nextQuantity);
  };

  const handleAddToOrder = () => {
    onAddToOrder?.({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      quantity: Number(quantity || 1),
    });
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="burger-details__overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${burger.name} details`}
      onClick={handleOverlayClick}
    >
      <div className="burger-details">
        <div className="burger-details__header">
          <button type="button" className="burger-details__back-button" onClick={() => onClose?.()}>
            ← Back to Menu
          </button>
          <button
            type="button"
            className="burger-details__close"
            onClick={() => onClose?.()}
            aria-label="Close burger details"
          >
            ×
          </button>
        </div>

        <div className="burger-details__body">
          <div className="burger-details__media">
            <div className="burger-details__image-wrap">
              <BurgerGallery burger={burger} selectedImage={selectedImage} onSelectImage={setSelectedImage} />
            </div>

            <button
              type="button"
              className={`burger-details__favorite ${isFavorite ? 'is-favorite' : ''}`}
              aria-label={
                isFavorite
                  ? `Remove ${burger.name} from favorites`
                  : `Add ${burger.name} to favorites`
              }
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite?.(burger.id);
              }}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>

          <div className="burger-details__content">
            <div className="burger-details__header-row">
              <h2 className="burger-details__name">{burger.name}</h2>
              <span className="burger-details__rating">★ {burger.rating}</span>
            </div>

            <p className="burger-details__price">₱{Number(burger.price || 0).toFixed(0)}</p>
            <p className="burger-details__description">{burger.description}</p>

            <div className="burger-details__ingredients-wrap">
              <h4>Full Ingredients</h4>
              <ul className="burger-details__ingredients">
                {(burger.ingredients || []).map((ingredient, index) => (
                  <li key={`${ingredient}-${index}`}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {children}

            <div className="burger-details__quantity-row">
              <label className="burger-details__quantity-label">Quantity</label>
              <div className="burger-details__quantity-control">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="burger-details__quantity-value">{Number(quantity || 1)}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button type="button" className="burger-details__add-button" onClick={handleAddToOrder}>
              Add to Order
            </button>

            <div className="burger-details__order-summary">
              <Cart items={cartItems} onRemoveItem={onRemoveItem} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
