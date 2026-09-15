import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BurgerGrid, { defaultBurgers } from './components/BurgerGrid';

export default function App() {
  const [favorites, setFavorites] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToOrder = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => (cartItem.id ?? cartItem.name) === (item.id ?? item.name),
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const nextQuantity = Number(currentItem.quantity || 0) + Number(item.quantity || 0);

        updated[existingIndex] = {
          ...currentItem,
          quantity: nextQuantity,
          subtotal: nextQuantity * Number(item.price || currentItem.price || 0),
        };

        return updated;
      }

      return [...prev, { ...item, subtotal: Number(item.subtotal || item.price * item.quantity || 0) }];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id ?? item.name) !== id));
  };

  return (
    <div className="app-shell">
      <Header cartCount={cartItems.length} />
      <section id="about" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h2>About</h2>
        <p>Welcome to Jomar Twisted Burger! We're passionate about serving delicious and creative burgers made with quality ingredients. Each burger is prepared with a combination of fresh ingredients and unique flavors to give you a satisfying meal every time.<br/><br/>Our mission is to bring joy and satisfaction to every bite. We want to create burgers that are simple, flavorful, and enjoyable for everyone. From our kitchen to your table, we always make sure that quality, taste, and good food come first.<br/><br/>Whether you're craving a crispy chicken burger, a cheesy bacon burger, or a classic beef burger, Jomar Twisted Burger has something for every burger lover. Come enjoy a tasty burger and experience our twisted flavors!</p>
      </section>

      <main id="shop" className="burger-shop">
        <section id="our-menu">
          <BurgerGrid
            burgers={defaultBurgers}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onAddToOrder={handleAddToOrder}
          />
        </section>
      </main>

      <section id="contact" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h2>Contact</h2>
        <p>Email: jomarfuentes708@gmail.com PHONE; 09386314157</p>
      </section>
    </div>
  );
}
