import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(private recipes: RecipeService) {}

  isFav(id: number): boolean {
    return !!this.recipes.getById(id)?.isFavorite;
  }

  toggle(id: number): void {
    this.recipes.toggleFavorite(id);
  }
}
