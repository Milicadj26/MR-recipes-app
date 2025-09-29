// src/app/services/category/category.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from 'src/app/interfaces/category.interface';
import { categories as seed } from 'src/app/dummy-data/categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly _categories$ = new BehaviorSubject<Category[]>([...seed]);

  // --- reads ---
  list$(): Observable<Category[]> {
    return this._categories$.asObservable();
  }

  list(): Category[] {
    return this._categories$.value;
  }

  getById$(id: number): Observable<Category | undefined> {
    return of(this.list().find(c => c.id === id));
  }

  getByKey(key: string): Category | undefined {
    return this.list().find(c => c.key === key);
  }

  // --- writes (optional, if you need CRUD later) ---
  add(cat: Category): void {
    this._categories$.next([...this.list(), cat]);
  }

  update(cat: Category): void {
    this._categories$.next(this.list().map(c => (c.id === cat.id ? cat : c)));
  }

  remove(id: number): void {
    this._categories$.next(this.list().filter(c => c.id !== id));
  }
}
