// src/app/data/recipes.ts
import { Recipe } from '../interfaces/recipe.interface';

export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Fluffy Pancakes',
    description: 'Quick breakfast pancakes—light and fluffy.',
    ingredients: [
      '1 cup all-purpose flour','2 tbsp sugar','1 tsp baking powder',
      '1/2 tsp baking soda','Pinch of salt','3/4 cup milk','1 egg','1 tbsp melted butter'
    ],
    instructions: [
      'Whisk dry ingredients.','Whisk wet ingredients.',
      'Combine just until lumpy.','Cook 1/4 cup portions 2–3 min/side.'
    ],
    timeMinutes: 20,
    difficulty: 'easy',
    calories: 320,
    // image: 'assets/recipes/pancakes.jpg', categoryId: 1
  },
  {
    id: 2,
    name: 'Chicken Avocado Salad',
    description: 'Grilled chicken, avocado and lemon dressing.',
    ingredients: [
      '1 grilled chicken breast','1 avocado','2 cups mixed greens',
      '6 cherry tomatoes','2 tbsp red onion','1 tbsp olive oil','1 tbsp lemon juice','Salt & pepper'
    ],
    instructions: [
      'Make dressing with oil, lemon, salt, pepper.',
      'Combine greens, tomatoes, onion, avocado, chicken.',
      'Toss and serve.'
    ],
    timeMinutes: 15,
    difficulty: 'easy',
    calories: 410,
    // categoryId: 2
  },
  {
    id: 3,
    name: 'Spaghetti Bolognese',
    description: 'Classic tomato-meat sauce over spaghetti.',
    ingredients: [
      '200 g spaghetti','250 g ground beef','1 small onion','1 garlic clove',
      '1 cup tomato passata','1/2 cup stock','1 tsp oregano','Salt & pepper','1 tbsp olive oil'
    ],
    instructions: [
      'Boil pasta until al dente.','Sauté onion and garlic.',
      'Brown meat.','Add tomatoes/stock/oregano; simmer 15 min.',
      'Serve over pasta.'
    ],
    timeMinutes: 35,
    difficulty: 'medium',
    calories: 560,
    // categoryId: 3
  },
  {
    id: 4,
    name: 'Veggie Stir-Fry',
    description: 'Crisp vegetables in soy-garlic glaze.',
    ingredients: [
      '1 cup broccoli','1 bell pepper','1 carrot','1/2 onion',
      '1 tbsp soy sauce','1 tsp honey','1 tsp minced garlic','1 tsp oil','Cooked rice'
    ],
    instructions: [
      'Mix soy, honey, garlic.','Stir-fry veggies 3–4 min.',
      'Add sauce; toss 1 min.','Serve over rice.'
    ],
    timeMinutes: 12,
    difficulty: 'easy',
    calories: 300,
    // categoryId: 4
  },
  {
    id: 5,
    name: 'Chocolate Mug Cake',
    description: 'Single-serve microwave cake.',
    ingredients: [
      '4 tbsp flour','3 tbsp sugar','2 tbsp cocoa','1/8 tsp baking powder',
      'Pinch salt','3 tbsp milk','2 tbsp oil','1/4 tsp vanilla'
    ],
    instructions: [
      'Mix dry in mug.','Stir in wet until smooth.',
      'Microwave 60–90 sec.','Cool 1–2 min and enjoy.'
    ],
    timeMinutes: 5,
    difficulty: 'easy',
    calories: 430,
    // categoryId: 5
  },
];
