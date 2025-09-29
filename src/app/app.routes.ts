import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },

  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/tabs/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/tabs/favorites/favorites.page').then(m => m.FavoritesPage),
      },
      {
        path: 'category/:key',
        loadComponent: () =>
          import('./pages/tabs/category-list/category-list.page')
            .then(m => m.CategoryListPage),
      },
      {
        path: 'recipe/:id',
        loadComponent: () =>
          import('./pages/tabs/recipe-detail/recipe-detail.page')
            .then(m => m.RecipeDetailPage),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./pages/tabs/add/add.page')
            .then(m => m.AddRecipePage),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'tabs/home' },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/tabs/favorites/favorites.page').then( m => m.FavoritesPage)
  }
];
