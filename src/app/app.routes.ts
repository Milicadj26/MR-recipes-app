import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.page').then((m) => m.SearchPage),
      },
      {
      path: 'list',
      loadComponent: () => import('./pages/list/list.page').then( m => m.ListPage)
      },
      {
        path: 'category/:key',                                              // /tabs/category/breakfast
        loadComponent: () => import('./pages/category-list/category-list.page')
                            .then(m => m.CategoryListPage),
      },

    ]

  },

  {path: '**', redirectTo: 'tabs/home'},
  {
    path: 'category-list',
    loadComponent: () => import('./pages/category-list/category-list.page').then( m => m.CategoryListPage)
  },
  
];
