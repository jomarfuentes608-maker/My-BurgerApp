import React from 'react';

export default function BurgerGallery({ burger, selectedImage = 0, onSelectImage }) {
  if (!burger) {
    return null;
  }

  const galleryImages = burger.images && burger.images.length > 0 ? burger.images : [burger.image || ''];

  return (
    <div className="burger-gallery" aria-label={`${burger.name} gallery`}>
      <div className="burger-gallery__main-image-wrap">
        <img
          src={galleryImages[selectedImage] || ''}
          alt={`${burger.name} main`}
          className="burger-gallery__main-image"
        />
      </div>

      <div className="burger-gallery__thumbs">
        {galleryImages.map((image, index) => (
          <button
            key={`${burger.id || burger.name}-image-${index}`}
            type="button"
            className={`burger-gallery__thumb ${index === selectedImage ? 'is-selected' : ''}`}
            onClick={() => onSelectImage?.(index)}
            aria-label={`Show image ${index + 1} for ${burger.name}`}
          >
            <img src={image || ''} alt={`${burger.name} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
