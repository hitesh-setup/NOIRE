import truffle from '@/assets/truffle.jpg';
import chefImage from '@/assets/chef.jpg';
import interior from '@/assets/interior.jpg';
import diningWorld from '@/assets/dining-world.jpg';

export const restaurant = {
  name: 'NOIRÉ', tagline: 'THE ART OF DINING',
  description: 'Where culinary craft becomes an unforgettable experience.',
  address: '18 Berkeley Square, Mayfair, London W1J 6DB',
  email: 'reservations@noire.example', phone: '+44 20 7946 0328',
  hours: 'Tuesday – Sunday · 17:30 – 23:00',
  currency: 'GBP',
};
export const images = { truffle, chef: chefImage, interior, diningWorld };
export const categories = ['Starters', 'Soups', 'Mains', 'Signature', 'Desserts', 'Drinks'] as const;
export type Category = typeof categories[number];
export type Dish = { id: string; name: string; category: Category; description: string; price: number; ingredients: string[]; allergens: string[]; tags: string[]; chefNote: string; featured?: boolean; image?: string };
export const dishes: Dish[] = [
 { id: 'truffle', name: 'NOIRÉ Truffle', category: 'Signature', description: 'Aged carnaroli rice, black truffle, 36-month Parmesan.', price: 38, ingredients: ['Carnaroli rice', 'Black truffle', 'Parmesan', 'Basil', 'Olive oil'], allergens: ['Milk'], tags: ['Vegetarian', "Chef’s Special", 'Gluten Free'], chefNote: 'A quiet celebration of the forest. Finished at the table with fresh truffle.', featured: true, image: truffle },
 { id: 'risotto', name: 'Midnight Risotto', category: 'Signature', description: 'Wild mushrooms, smoked butter, a whisper of thyme.', price: 34, ingredients: ['Wild mushrooms', 'Carnaroli rice', 'Smoked butter', 'Thyme'], allergens: ['Milk'], tags: ['Vegetarian', 'Gluten Free'], chefNote: 'Slowly stirred, never rushed. Earthy, deep, and beautifully simple.', featured: true, image: truffle },
 { id: 'tomato', name: 'Embered Tomato', category: 'Starters', description: 'Fire-roasted heritage tomato, basil oil, whipped ricotta.', price: 19, ingredients: ['Heritage tomato', 'Basil', 'Ricotta', 'Sourdough'], allergens: ['Milk', 'Gluten'], tags: ['Vegetarian'], chefNote: 'A familiar ingredient, seen in a completely new light.', featured: true },
 { id: 'duck', name: 'Black Garlic Duck', category: 'Mains', description: 'Dry-aged duck, black garlic glaze, cherry, celeriac.', price: 46, ingredients: ['Duck breast', 'Black garlic', 'Cherry', 'Celeriac'], allergens: ['Celery'], tags: ["Chef’s Special", 'Gluten Free'], chefNote: 'The balance of smoke, sweetness, and a perfectly crisp skin.', featured: true },
 { id: 'sea', name: 'Citrus Sea', category: 'Mains', description: 'Hand-dived scallops, preserved lemon, sea herbs.', price: 39, ingredients: ['Scallops', 'Preserved lemon', 'Sea herbs', 'Butter'], allergens: ['Molluscs', 'Milk'], tags: ['Gluten Free'], chefNote: 'Inspired by mornings on the coast. Bright, delicate, and alive.', featured: true },
 { id: 'chocolate', name: 'Dark Chocolate', category: 'Desserts', description: '70% single-origin cacao, vanilla, olive oil, sea salt.', price: 16, ingredients: ['Cacao', 'Vanilla', 'Olive oil', 'Sea salt'], allergens: ['Milk', 'Eggs'], tags: ['Vegetarian', 'Gluten Free'], chefNote: 'A bittersweet ending that stays with you.', featured: true },
 { id: 'burrata', name: 'Garden Burrata', category: 'Starters', description: 'Creamy burrata, seasonal leaves, pistachio, aged balsamic.', price: 21, ingredients: ['Burrata', 'Pistachio', 'Seasonal leaves'], allergens: ['Milk', 'Nuts'], tags: ['Vegetarian', 'Gluten Free'], chefNote: 'Let the season lead.' },
 { id: 'mushroom', name: 'Forest Velouté', category: 'Soups', description: 'Wild mushroom velouté, chestnut, herb oil.', price: 17, ingredients: ['Mushrooms', 'Chestnut', 'Herb oil'], allergens: ['Nuts'], tags: ['Vegan', 'Gluten Free'], chefNote: 'An autumn walk, distilled into a bowl.' },
 { id: 'bisque', name: 'Lobster Bisque', category: 'Soups', description: 'Roasted lobster, saffron, cognac cream.', price: 24, ingredients: ['Lobster', 'Saffron', 'Cognac', 'Cream'], allergens: ['Crustaceans', 'Milk'], tags: ['Gluten Free'], chefNote: 'Layer upon layer of coastal flavour.' },
 { id: 'aubergine', name: 'Charred Aubergine', category: 'Mains', description: 'Coal-roasted aubergine, miso, sesame, chilli.', price: 29, ingredients: ['Aubergine', 'Miso', 'Sesame', 'Chilli'], allergens: ['Soy', 'Sesame'], tags: ['Vegan', 'Spicy'], chefNote: 'Vegetables deserve the centre of the table.' },
 { id: 'pear', name: 'Vanilla Poached Pear', category: 'Desserts', description: 'Conference pear, Madagascan vanilla, almond crumble.', price: 14, ingredients: ['Pear', 'Vanilla', 'Almond'], allergens: ['Nuts', 'Gluten'], tags: ['Vegan'], chefNote: 'Comfort, with a little intrigue.' },
 { id: 'negroni', name: 'The NOIRÉ Negroni', category: 'Drinks', description: 'Botanical gin, bitter orange, vermouth, smoked rosemary.', price: 16, ingredients: ['Gin', 'Vermouth', 'Bitter orange', 'Rosemary'], allergens: ['Sulphites'], tags: ['Vegan'], chefNote: 'Our favourite way to begin an evening.' },
 { id: 'botanical', name: 'Botanical Hour', category: 'Drinks', description: 'Alcohol-free cucumber, elderflower, lime, tonic.', price: 12, ingredients: ['Cucumber', 'Elderflower', 'Lime', 'Tonic'], allergens: [], tags: ['Vegan', 'Gluten Free'], chefNote: 'All the occasion. None of the alcohol.' },
];
export const formatPrice = (price: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: restaurant.currency, maximumFractionDigits: 0 }).format(price);
export const areas = [
 { name: 'Main dining', text: 'Warm light, considered details, and room for a conversation to last all evening.' },
 { name: "Chef’s table", text: 'An intimate dining experience where every course becomes part of the conversation.' },
 { name: 'Private dining', text: 'A world of your own. An intimate setting for celebrations, shared with up to eight guests.' },
 { name: 'The bar', text: 'Thoughtful cocktails, rare spirits, and a little time to savour the moment.' },
 { name: 'Terrace', text: 'A slower pace, a city view, and the pleasure of dining beneath the evening sky.' },
];
export const gallery = [
 { image: diningWorld, title: 'An evening at NOIRÉ', category: 'Dining' },
 { image: truffle, title: 'The art of the plate', category: 'Food' },
 { image: interior, title: 'A room with a feeling', category: 'Interior' },
 { image: chefImage, title: 'Crafted with intention', category: 'Chef' },
 { image: diningWorld, title: 'After the lights come on', category: 'Atmosphere' },
];
export const reviews = [
 { quote: 'Some evenings stay with you. The warmth, the quiet theatre of every course, the feeling that every detail was meant for us.', name: 'Isabella M.', date: 'September 2026' },
 { quote: 'The truffle risotto is extraordinary. But it is the way the entire evening unfolds that makes NOIRÉ truly special.', name: 'James W.', date: 'August 2026' },
 { quote: 'Beautifully considered food, effortless hospitality, and an atmosphere you never want to leave.', name: 'Amelia R.', date: 'September 2026' },
];