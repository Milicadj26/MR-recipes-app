import type { CategoryID } from '../interfaces/recipe.interface';

export interface Category {
    id: number;
    key: CategoryID; 
    name: string;
    label: string;
    image: string;
}
