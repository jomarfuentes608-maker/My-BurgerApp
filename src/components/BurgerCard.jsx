import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function BurgerCard({ burger = {}, onSelect, onToggleFavorite, isFavorite = false, cartItems = [], onRemoveItem, onAddToOrder }) {
  const { id, name, rating = 5, description = '', price = 0, image = '' } = burger;
  const [quantity, setQuantity] = useState(1);
  const starsArray = Array.from({ length: 5 });

  const handleCardClick = () => {
    onSelect?.(burger);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleAddToOrder = () => {
    onAddToOrder?.({
      id,
      name,
      price,
      quantity: Number(quantity),
    });
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <article
      className="burger-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
    >
      <div className="burger-card__image-wrap">
        <img src={image} alt={name} className="burger-card__image" />

        <button
          type="button"
          className={`burger-card__favorite ${isFavorite ? 'is-favorite' : ''}`}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          aria-pressed={isFavorite}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.(id);
          }}
        >
          <Heart
            size={15}
            strokeWidth={2.3}
            fill={isFavorite ? '#d65020' : 'none'}
            color={isFavorite ? '#d65020' : '#2f2d2a'}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="burger-card__rating" aria-label={`${rating} star rating`}>
        {starsArray.map((_, i) => (
          <span key={i} className="star" aria-hidden="true">★</span>
        ))}
      </div>

      <div className="burger-card__info">
        <h3 className="burger-card__name">{name}</h3>
        <p className="burger-card__description">{description}</p>
      </div>

      <button
        type="button"
        className="burger-card__price"
        onClick={(event) => {
          event.stopPropagation();
          handleCardClick();
        }}
      >
        ₱{Number(price).toFixed(0)}
      </button>
    </article>
  );
}
