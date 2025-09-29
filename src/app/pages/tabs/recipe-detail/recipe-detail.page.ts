import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonSegment, IonList, IonAccordionGroup, IonBackButton, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonChip, IonSegmentButton, IonAccordion } from '@ionic/angular/standalone';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe';

import {chevronDownOutline, shareOutline, heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
type Segment = 'Ingredients' | 'Instructions' | 'Notes';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
  standalone: true,
  imports: [
    IonChip, 
    IonLabel, 
    IonItem, 
    IonIcon, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonButton, 
    IonBackButton,
    IonSegmentButton,
    IonList,
    IonAccordionGroup,
    IonSegment,
    IonAccordion
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})



export class RecipeDetailPage implements OnInit {
  recipe: Recipe | null = null;
  id?: number;

  
  segment: Segment = 'Ingredients';
  servingsOpen = false;
  r: any;
  



  constructor(private route: ActivatedRoute, private recipes: RecipeService) {

    
    addIcons({
      shareOutline,
      chevronDownOutline,
      'share-outline':shareOutline,
      'heartOutline':heartOutline,
      'heart':heart,
      'chevron-down-outline':chevronDownOutline,
    });
   }


  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!Number.isFinite(id)) {
      return;
    }
    const found = this.recipes.getById(id); 
    if (!found) {
    
      return;
    }
    this.recipe = found; // OK now

    
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
    return this.recipe?.images && this.recipe.images.length > 0
      ? this.recipe.images[0]
      : 'assets/recipes/placeholder.jpg';
  }
  hasGallery(): boolean {
    return !!this.recipe?.images && this.recipe.images.length > 1;
  }


}
