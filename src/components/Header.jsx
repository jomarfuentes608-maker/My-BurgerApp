import React from 'react';
import { ShoppingCart } from 'lucide-react';

const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#our-menu' },
  { label: 'Shop', href: '#shop' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ cartCount = 0 }) {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.startsWith('#') ? href.slice(1) : href;
    const target = document.getElementById(id) || document.querySelector(href);
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback: update hash so link still works
      window.location.hash = href;
    }
  };
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="header__logo-brand" aria-label="Jomar Twisted Burger Home">
          <img
            src="/burger-logo.png"
            alt="Jomar Twisted Burger"
            className="header__logo-img"
          />
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="header__nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}

          <button type="button" className="header__cart-button" aria-label="View cart">
            <ShoppingCart size={18} strokeWidth={2.2} aria-hidden="true" />
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
