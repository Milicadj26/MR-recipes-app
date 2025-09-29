import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {
  IonHeader,  IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonContent, IonIcon, IonSearchbar, IonButton, IonItem, IonLabel, IonicSlides,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { JsonPipe } from '@angular/common';     

import { homeOutline, settings, searchOutline, optionsOutline, listOutline, chevronDownOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { ListHeadingComponent } from '../../../components/list-heading/list-heading.component';
import { BannerComponent } from "../../../components/banner/banner.component";
import { Category } from '../../../interfaces/category.interface';
import { Recipe } from '../../../interfaces/recipe.interface';
import { CategoryService } from '../../../services/category/category';
import { RecipeService } from '../../../services/recipe/recipe';
import { BannerService } from '../../../services/banner/banner.service';
import { Banner } from '../../../interfaces/banner.interface';
import { CategoriesComponent } from '../../../components/categories/categories.component';

import { RecipeListHorizonComponent } from '../../../components/recipe-list-horizon/recipe-list-horizon.component';
import { register } from 'swiper/element/bundle';
register();

import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    
    IonHeader, IonToolbar, RouterLink, IonTitle, IonButtons, IonLabel, IonMenuButton,
    IonContent, IonSearchbar, IonButton, IonIcon, IonItem,
    
    FormsModule, ListHeadingComponent, RecipeListHorizonComponent,
    BannerComponent, CategoriesComponent, JsonPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {

  private router = inject(Router);

  openRecipe($event: Event) {
  throw new Error('Method not implemented.');
  }

  
  
  private categoryService = inject(CategoryService);
  private recipeService  = inject(RecipeService);
  private bannerService = inject(BannerService);

  banners = computed<Banner[]> (() => this.bannerService.getBanners());
  categories = computed(() => this.categoryService.list());

  recipes   = computed<Recipe[]>(() => this.recipeService.list());

  

  constructor() {
      addIcons({
        chevronDownOutline,
        'home-outline': homeOutline,
        'search-outline': searchOutline,
        'list-outline': listOutline,
        'options-outline': optionsOutline,
        'settings' : settings,
      });
 }
 query = '';

 
 filterOn = false;
 toggleFilter(){
  this.filterOn = !this.filterOn;
 }

 openCategory(key: string, ev?: Event) {
    ev?.stopPropagation?.();
    this.router.navigate(['/tabs/category', key]);
  }

 
    
}



