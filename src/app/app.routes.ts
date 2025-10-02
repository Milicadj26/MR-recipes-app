import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: 'landing', loadComponent: () => import('./pages/landing/landing.page').then(m => m.LandingPage) },
  { path: 'login',   loadComponent: () => import('./pages/login/login.page').then(m => m.LogInPage) },     // <-- verify path
  { path: 'signup',  loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage) },  // <-- verify path
  { path: 'reset-password', loadComponent: () => import('./pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage) },

  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'home', loadComponent: () => import('./pages/tabs/home/home.page').then(m => m.HomePage) },
      { path: 'favorites', loadComponent: () => import('./pages/tabs/favorites/favorites.page').then(m => m.FavoritesPage) },
      { path: 'category/:key', loadComponent: () => import('./pages/tabs/category-list/category-list.page').then(m => m.CategoryListPage) },
      { path: 'recipe/:id', loadComponent: () => import('./pages/tabs/recipe-detail/recipe-detail.page').then(m => m.RecipeDetailPage) },
      { path: 'add', loadComponent: () => import('./pages/tabs/add/add.page').then(m => m.AddRecipePage) },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },

  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: '**', redirectTo: 'landing' },
];
