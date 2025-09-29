// src/app/dummy-data/categories.ts
import { Category } from '../interfaces/category.interface';

export const categories: Category[] = [
  { id: 1, key: 'breakfast',  name: 'Breakfast',  label: 'Start the day ☀️', image: 'assets/categories/breakfast.png' },
  { id: 2, key: 'lunch',      name: 'Lunch',      label: 'Midday meals 🍽️',  image: 'assets/categories/lunch.png' },
  { id: 3, key: 'dinner',     name: 'Dinner',     label: 'Evening bites 🌙',  image: 'assets/categories/dinner.png' },
  { id: 4, key: 'snacks',     name: 'Snacks',     label: 'Quick & tasty 😋',  image: 'assets/categories/snacks.png' },
  { id: 5, key: 'desserts',   name: 'Desserts',   label: 'Sweet treats 🍰',   image: 'assets/categories/dessert.png' },
];
