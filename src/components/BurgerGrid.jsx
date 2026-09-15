import { useState } from 'react';
import BurgerCard from './BurgerCard';
import BurgerDetails from './BurgerDetails';

export const defaultBurgers = [
	{
		id: 1,
		name: 'CRISPY CHICKEN',
		rating: 5,
		description: 'Crispy chicken breast, lettuce, tomato, pickles, coleslaw',
		price: 99,
		image: 'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ=',
		ingredients: ['Crispy chicken breast', 'Lettuce', 'Tomato', 'Pickles', 'Coleslaw'],
		images: [
			'https://media.istockphoto.com/id/539243164/photo/crispy-chicken-burger.jpg?s=612x612&w=0&k=20&c=rKASkwLpNnhEU7gyCAlHw8wrPnK-mpN_xuypwiGzVsQ=',
		],
	},
	{
		id: 2,
		name: 'BACON BURGER',
		rating: 5,
		description: 'Beef patty, crispy bacon, cheddar cheese, onion, special sauce',
		price: 129,
		image: 'https://media.istockphoto.com/id/520215281/photo/bacon-burger.jpg?s=612x612&w=0&k=20&c=oeN1zlDU0_CiXXbSaH9ugzdUqaUmaUXUJXmLn-pw4jM=',
		ingredients: ['Beef patty', 'Crispy bacon', 'Cheddar cheese', 'Onion', 'Special sauce'],
		images: [
			'https://media.istockphoto.com/id/520215281/photo/bacon-burger.jpg?s=612x612&w=0&k=20&c=oeN1zlDU0_CiXXbSaH9ugzdUqaUmaUXUJXmLn-pw4jM=',
		],
	},
	{
		id: 3,
		name: 'PREMIUM BURGER',
		rating: 4,
		description: 'Premium beef patty, cheddar cheese, lettuce, tomato, special burger sauce',
		price: 119,
		image: 'https://www.redefinemeat.com/uk/wp-content/uploads/sites/4/2024/08/Retail_Recipe_Photoshoot_Premium-Burgers_Plain-1-scaled-1.jpg',
		ingredients: ['Premium beef patty', 'Cheddar cheese', 'Lettuce', 'Tomato', 'Special burger sauce'],
		images: [
			'https://www.redefinemeat.com/uk/wp-content/uploads/sites/4/2024/08/Retail_Recipe_Photoshoot_Premium-Burgers_Plain-1-scaled-1.jpg',
		],
	},
	{
		id: 4,
		name: 'DOUBLE BACON CHEESEBURGER',
		rating: 4,
		description: 'Double beef patty, double cheddar cheese, crispy bacon, onion, special sauce',
		price: 149,
		image: 'https://media.istockphoto.com/id/117150229/photo/double-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=t8uhCixK5x80rV6CE3PBx3POekCea2Z7Gkvonzm8_tU=',
		ingredients: ['Double beef patty', 'Double cheddar cheese', 'Crispy bacon', 'Onion', 'Special sauce'],
		images: [
			'https://media.istockphoto.com/id/117150229/photo/double-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=t8uhCixK5x80rV6CE3PBx3POekCea2Z7Gkvonzm8_tU=',
		],
	},
];

export default function BurgerGrid({ burgers = defaultBurgers, onToggleFavorite, favorites = {}, cartItems = [], onRemoveItem, onAddToOrder }) {
	const [selectedBurger, setSelectedBurger] = useState(null);
	const [quantity, setQuantity] = useState(1);

	const handleOpenDetails = (burger) => {
		setSelectedBurger(burger);
		setQuantity(1);
	};

	const handleCloseDetails = () => {
		setSelectedBurger(null);
		setQuantity(1);
	};

	return (
		<>
			<section className="burger-grid" aria-label="Burger menu">
				<div className="burger-grid__intro">
					<p className="burger-grid__eyebrow">OUR CRAZY BURGERS</p>
					<p className="burger-grid__subtitle">
						Big flavors, premium patties, and crispy bites made for every burger craving.
					</p>
				</div>

				<div className="burger-grid__items">
					{burgers.map((burger) => (
						<BurgerCard
							key={burger.id}
							burger={burger}
							onSelect={handleOpenDetails}
							onToggleFavorite={onToggleFavorite}
							isFavorite={Boolean(favorites[burger.id])}
						/>
					))}
				</div>
			</section>

			{selectedBurger && (
				<BurgerDetails
					burger={selectedBurger}
					onClose={handleCloseDetails}
					cartItems={cartItems}
					onRemoveItem={onRemoveItem}
					onToggleFavorite={onToggleFavorite}
					isFavorite={Boolean(favorites[selectedBurger.id])}
					quantity={quantity}
					onQuantityChange={setQuantity}
					onAddToOrder={onAddToOrder}
				/>
			)}
		</>
	);
}
