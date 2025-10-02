import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonToggle
} from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import type { CategoryID, Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { CategoryService } from 'src/app/services/category/category';

const DEFAULT_IMAGE = 'assets/recipes/placeholder.jpg';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonToggle
  ],
})
export class AddRecipePage {
  private fb = inject(FormBuilder);
  private recipes = inject(RecipeService);
  private categories = inject(CategoryService);
  private router = inject(Router);

  //gets categs
  cats = computed(() => this.categories.list());

  form = this.fb.group({
    name: ['', Validators.required],
    image: [''],
    timeMinutes: [0, [Validators.required, Validators.min(0)]],
    difficulty: ['Easy' as 'Easy' | 'Medium' | 'Hard', Validators.required],
    calories: [0, [Validators.min(0)]],
    servings: [1, [Validators.min(1)]],
    description: [''],
    isFavorite: [false],
    categoryIds: this.fb.control<CategoryID[]>([]), 
    ingredients: this.fb.array([ this.fb.group({ name: [''], qty: [''] }) ]),
    steps: this.fb.array([ this.fb.group({ title: ['Step 1'], text: [''] }) ]),
  });

  get ingredients() { return this.form.get('ingredients') as FormArray; }
  get steps() { return this.form.get('steps') as FormArray; }

  addIngredient() { this.ingredients.push(this.fb.group({ name: [''], qty: [''] })); }
  removeIngredient(i: number) { this.ingredients.removeAt(i); }

  addStep() {
    const n = this.steps.length + 1;
    this.steps.push(this.fb.group({ title: [`Step ${n}`], text: [''] }));
  }
  removeStep(i: number) { this.steps.removeAt(i); }

  toggleCategory(key: CategoryID, ev: CustomEvent) {
    const checked = (ev.detail as any).checked as boolean;
    const ctrl = this.form.get('categoryIds') as FormControl<CategoryID[]>;
    const next = new Set(ctrl.value ?? []);
    checked ? next.add(key) : next.delete(key);
    ctrl.setValue(Array.from(next) as CategoryID[]);
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const nextId =
      (this.recipes.list().reduce((m, r) => Math.max(m, r.id), 0) || 0) + 1;

    const raw = this.form.value;
    const newRecipe: Recipe = {
      id: nextId,
      name: raw.name!.trim(),
      image: raw.image?.trim() || DEFAULT_IMAGE,
      images: raw.image?.trim() ? [raw.image.trim()] : [DEFAULT_IMAGE],
      timeMinutes: Number(raw.timeMinutes) || 0,
      difficulty: raw.difficulty!,
      calories: Number(raw.calories) || 0,
      servings: Number(raw.servings) || 1,
      description: raw.description || '',
      isFavorite: !!raw.isFavorite,
      categoryIds: (raw.categoryIds ?? []) as CategoryID[],   // keep union type
      ingredients: (raw.ingredients || []).map(i => ({
        name: i?.name?.trim() || '',
        qty: i?.qty?.trim() || '',
      })),
      steps: (raw.steps || []).map(s => ({
        title: s?.title?.trim() || 'Step',
        text: s?.text?.trim() || '',
      })),
      
    };

    this.recipes.add(newRecipe);
    this.router.navigate(['/tabs/recipe', newRecipe.id]);
  }
}
