import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { recipes, recipes as seed } from 'src/app/dummy-data/recipes';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly _recipes$ = new BehaviorSubject<Recipe[]>([...seed]);

  // read
  list$(): Observable<Recipe[]> { return this._recipes$.asObservable(); }
  list(): Recipe[] { return this._recipes$.value; }
  getById(id: number): Observable<Recipe | undefined> {
    return of(this._recipes$.value.find(r => r.id === id));
  }

  // convenience filters
  byCategory(categoryId: number): Observable<Recipe[]> {
    return of(this._recipes$.value.filter(r => (r as any).categoryId === categoryId));
  }
  search(term: string): Observable<Recipe[]> {
    const q = term.trim().toLowerCase();
    if (!q) return of(this._recipes$.value);
    return of(
      this._recipes$.value.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q))
    );
  }

  // in-memory CRUD (for your single-user app)
  add(recipe: Recipe): void {
    const next = [...this._recipes$.value, recipe];
    this._recipes$.next(next);
  }
  update(recipe: Recipe): void {
    const next = this._recipes$.value.map(r => (r.id === recipe.id ? recipe : r));
    this._recipes$.next(next);
  }
  remove(id: number): void {
    const next = this._recipes$.value.filter(r => r.id !== id);
    this._recipes$.next(next);
  }

  getRecipes(): Recipe[]{
      return recipes;
    }
}
