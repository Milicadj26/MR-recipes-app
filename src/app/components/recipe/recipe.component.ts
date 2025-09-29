import { Component, CUSTOM_ELEMENTS_SCHEMA, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { IonCard, IonThumbnail, IonImg, IonItem, IonLabel, IonText, IonIcon } from '@ionic/angular/standalone';
import { FavoritesService } from 'src/app/services/favorites/favorites';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';


@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [IonIcon, IonText, IonLabel, IonItem, IonImg, IonCard, IonThumbnail],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecipeComponent {
  private router = inject(Router);

  item = input<Recipe | null>(null);
  fallback = 'assets/recipes/placeholder.jpg';

  constructor(public favs: FavoritesService) {
    addIcons({ 'heart-outline': heartOutline, heart });
  }

  onImgErr(e: Event) {
    (e.target as HTMLImageElement).src = this.fallback;
  }

  openDetail(id: number) {
    this.router.navigate(['/tabs/recipe', id]);
  }

  toggleFav(id: number, ev?: Event) {
    ev?.stopPropagation();
    this.favs.toggle(id);
  }

 
}
