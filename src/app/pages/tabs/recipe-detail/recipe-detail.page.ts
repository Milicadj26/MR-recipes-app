import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonSegment, IonList, IonAccordionGroup, IonBackButton, IonHeader,
  IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonLabel,
  IonChip, IonSegmentButton, IonAccordion, AlertController
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeService } from 'src/app/services/recipe/recipe';

import { addIcons } from 'ionicons';
import { chevronDownOutline, shareOutline, heart, heartOutline, trashOutline } from 'ionicons/icons';

type Segment = 'Ingredients' | 'Instructions' | 'Notes';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
  imports: [
    IonChip, IonLabel, IonItem, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButton, IonBackButton, IonSegmentButton, IonList, IonAccordionGroup,
    IonSegment, IonAccordion
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecipeDetailPage implements OnInit {
  // services via inject()
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private recipes = inject(RecipeService);

  recipe: Recipe | null = null;

  segment: Segment = 'Ingredients';
  servingsOpen = false;

  constructor() {
    addIcons({ shareOutline, trashOutline, heartOutline, heart, chevronDownOutline });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id)) return;

    const found = this.recipes.getById(id);
    if (!found) return;

    this.recipe = found;
  }

  toggleFav() {
    if (!this.recipe) return;
    this.recipe.isFavorite = this.recipes.toggleFavorite(this.recipe.id);
  }

  setSegment(s: Segment) { this.segment = s; }

  setServings(n: number) {
    if (!this.recipe) return;
    this.recipes.updateServings(this.recipe.id, n);
    this.servingsOpen = false;
  }

  heroImage(): string {
    return this.recipe?.images?.length ? this.recipe.images[0] : 'assets/recipes/placeholder.jpg';
  }

  hasGallery(): boolean {
    return !!this.recipe?.images && this.recipe.images.length > 1;
  }

  async confirmDelete() {
    if (!this.recipe) return;

    const alert = await this.alertCtrl.create({
      header: 'Delete recipe?',
      message: 'This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => this.deleteRecipe() },
      ],
    });
    await alert.present();
  }

  private deleteRecipe() {
    if (!this.recipe) return;
    this.recipes.remove(this.recipe.id);
    this.router.navigate(['/tabs/home']);
  }
}
