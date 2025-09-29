import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';

import { RecipeComponent } from 'src/app/components/recipe/recipe.component';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { CategoryService } from 'src/app/services/category/category';
import { Recipe } from 'src/app/interfaces/recipe.interface';

type SortKey = 'recent' | 'time' | 'calories' | 'difficulty';

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonRefresher, IonRefresherContent,
    IonSegment, IonSegmentButton,
    RecipeComponent
  ],
})
export class CategoryListPage {
  private route = inject(ActivatedRoute);
  private recipesSrv = inject(RecipeService);
  private categoriesSrv = inject(CategoryService);

  // URL /tabs/category/:key
  key = signal<string>('');

  // Page title from category seed (label -> name -> fallback)
  title = computed(() => {
    const c = this.categoriesSrv.getByKey(this.key());
    return c?.label ?? c?.name ?? 'Category';
  });

  // Base items (filter by key or id—supports categoryKey / categoryIds[] / categoryId)
  items = computed<Recipe[]>(() => {
    const all = this.recipesSrv.list();
    const cat = this.category();
    if (!cat) return [];

    const key = (cat.key || '').toLowerCase();
    const id  = cat.id;

    return all.filter((r: any) => {
      // array of keys on the recipe
      if (Array.isArray(r?.categoryIds)) {
        const keys = r.categoryIds.map((x: any) => String(x).toLowerCase());
        if (keys.includes(key)) return true;
      }
      // single key on the recipe
      if (typeof r?.categoryKey === 'string' && r.categoryKey.toLowerCase() === key) return true;
      // numeric id on the recipe
      if (typeof r?.categoryId === 'number' && typeof id === 'number' && r.categoryId === id) return true;

      return false;
    });
  });

  category = computed(() => {
    const raw = decodeURIComponent(this.key() || '');
    const k = raw.toLowerCase();
    return (
      this.categoriesSrv.getByKey(raw) ||
      this.categoriesSrv.list().find(c =>
        (c.key?.toLowerCase?.() === k) ||
        (c.name?.toLowerCase?.() === k) ||
        (c.label?.toLowerCase?.() === k)
      )
    );
  });

  // Sorting
  sortBy = signal<SortKey>('recent');
  sorted = computed<Recipe[]>(() => {
    const list = [...this.items()];
    switch (this.sortBy()) {
      case 'time':
        return list.sort((a: any, b: any) => (a.timeMinutes || 0) - (b.timeMinutes || 0));
      case 'calories':
        return list.sort((a: any, b: any) => (a.calories || 0) - (b.calories || 0));
      case 'difficulty':
        const rank = { Easy: 1, Medium: 2, Hard: 3 } as any;
        return list.sort((a: any, b: any) => (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0));
      default: // recent (assuming createdAt ISO string)
        return list.sort((a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
    }
  });

  constructor() {
    const k = this.route.snapshot.paramMap.get('key') ?? '';
    this.key.set(k);
    this.route.paramMap.subscribe((pm: ParamMap) => {
      this.key.set(pm.get('key') ?? '');
      // console.debug('cat route key=', this.key());
    });
  }

  // pull-to-refresh (you can hook real reloads later)
  doRefresh(ev: CustomEvent) {
    // If you fetch from API, call service here then complete:
    setTimeout(() => (ev.target as HTMLIonRefresherElement).complete(), 300);
  }

  setSort(s: SortKey) { this.sortBy.set(s); }
}
