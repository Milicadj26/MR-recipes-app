import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { categories, categories as seed } from 'src/app/dummy-data/categories';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly _categories$ = new BehaviorSubject<Category[]>([...seed]);

  list$(): Observable<Category[]> {
    return this._categories$.asObservable();
  }

  list(): Category[] {
    return this._categories$.value;
  }

  getById(id: number): Observable<Category | undefined> {
    return of(this._categories$.value.find(c => c.id === id));
  }

  getCategories(): Category[]{
    return categories;
  }

}
export { Category };

