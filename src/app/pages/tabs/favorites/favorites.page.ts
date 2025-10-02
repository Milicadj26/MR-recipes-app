import { Component, computed, inject, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';

import { RecipeComponent } from 'src/app/components/recipe/recipe.component';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { Recipe } from 'src/app/interfaces/recipe.interface';

type SortKey = 'recent' | 'time' | 'calories' | 'difficulty';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonSegment, IonSegmentButton,
    RecipeComponent
  ],
})
export class FavoritesPage {
  private recipesSrv = inject(RecipeService);

  // All favorites
  items = computed<Recipe[]>(() => this.recipesSrv.list().filter(r => !!r.isFavorite));

  // Sorting them
  sortBy = signal<SortKey>('recent');
  sorted = computed<Recipe[]>(() => {
    const list = [...this.items()];
    switch (this.sortBy()) {
      case 'time':      return list.sort((a: any, b: any) => (a.timeMinutes || 0) - (b.timeMinutes || 0));
      case 'calories':  return list.sort((a: any, b: any) => (a.calories || 0) - (b.calories || 0));
      case 'difficulty':
        const rank = { Easy: 1, Medium: 2, Hard: 3 } as any;
        return list.sort((a: any, b: any) => (rank[a.difficulty] || 0) - (rank[b.difficulty] || 0));
      default:          // recent
        return list.sort((a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
    }
  });

  setSort(s: SortKey) { this.sortBy.set(s); }
}
