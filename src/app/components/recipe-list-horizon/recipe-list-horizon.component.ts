import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recipe-list-horizon',
  standalone: true,
  templateUrl: './recipe-list-horizon.component.html',
  styleUrls: ['./recipe-list-horizon.component.scss'],
  imports: [CommonModule, RecipeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecipeListHorizonComponent {
  recipes = input<Recipe[]>([]);
}
