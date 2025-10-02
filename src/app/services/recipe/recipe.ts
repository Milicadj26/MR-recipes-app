import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { recipes as seed } from 'src/app/dummy-data/recipes';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  filterByCategory(arg0: string): Recipe[] {
    throw new Error('Method not implemented.');
  }
  private readonly _recipes$ = new BehaviorSubject<Recipe[]>([...seed]);

  list$(): Observable<Recipe[]> { return this._recipes$.asObservable(); }
  list(): Recipe[] { return this._recipes$.value; }

  getById(id: number): Recipe | undefined {
    return this._recipes$.value.find(r => r.id === id);
  }
  getById$(id: number): Observable<Recipe | undefined> {
    return of(this.getById(id));
  }

  // ---------- CATEGORY HELPERS ----------
  /** Flexible matcher: supports categoryId (number), categoryKey (string),
   *  or categoryIds: string[] on the recipe object. */
  private matchesCategory(r: Recipe, needle: number | string): boolean {
    const anyR = r as any;
    if (typeof needle === 'number') {
      return anyR.categoryId === needle;
    } else {
      // string key
      return anyR.categoryKey === needle ||
             (Array.isArray(anyR.categoryIds) && anyR.categoryIds.includes(needle));
    }
  }

  /** Observable filters */
  byCategoryId$(id: number): Observable<Recipe[]> {
    return of(this._recipes$.value.filter(r => this.matchesCategory(r, id)));
  }
  byCategoryKey$(key: string): Observable<Recipe[]> {
    return of(this._recipes$.value.filter(r => this.matchesCategory(r, key)));
  }

  /** Sync filters (handy with signals/computed in pages) */
  byCategoryId(id: number): Recipe[] {
    return this._recipes$.value.filter(r => this.matchesCategory(r, id));
  }
  byCategoryKey(key: string): Recipe[] {
    return this._recipes$.value.filter(r => this.matchesCategory(r, key));
  }
  // --------------------------------------

  search(term: string): Observable<Recipe[]> {
    const q = term.trim().toLowerCase();
    if (!q) return of(this._recipes$.value);

    return of(
      this._recipes$.value.filter(r => {
        const inName = r.name.toLowerCase().includes(q);
        const inDesc = (r as any).description?.toLowerCase?.().includes(q);
        const inIngr = r.ingredients?.some(i =>
          i.name.toLowerCase().includes(q) || i.qty?.toLowerCase().includes(q)
        );
        const inSteps = r.steps?.some(s =>
          s.title.toLowerCase().includes(q) || s.text?.toLowerCase().includes(q)
        );
        return inName || inDesc || inIngr || inSteps;
      })
    );
  }

  // CRUD
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

  // Convenience for selecting
  toggleFavorite(id: number): boolean {
    const rec = this.getById(id);
    if (!rec) return false;
    rec.isFavorite = !rec.isFavorite;
    this.update(rec);
    return rec.isFavorite;
  }

  updateServings(id: number, servings: number): void {
    const rec = this.getById(id);
    if (!rec) return;
    rec.servings = servings;
    this.update(rec);
  }

  
}
