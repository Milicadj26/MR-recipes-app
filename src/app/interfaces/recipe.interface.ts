export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    timeMinutes: number;
    difficulty: Difficulty;
    calories: number;
}
