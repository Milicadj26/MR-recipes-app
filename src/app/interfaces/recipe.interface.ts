export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type CategoryID = 'lunch' | 'dinner' | 'breakfast' | 'snacks' | 'desserts';

import{Ingredient} from 'src/app/interfaces/ingredients';
import{Step} from 'src/app/interfaces/step';


export interface Recipe {
  id: number;
  name: string;
  image: string;          
  images?: string[];
  timeMinutes: number;    
  time?: string;
  difficulty?: Difficulty;
  calories?: number;
  servings?: number;
  description?: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes?: string[];
  isFavorite?: boolean;
  categoryIds: CategoryID[]; 
}
