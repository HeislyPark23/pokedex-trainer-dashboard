import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/dashboard-page/dashboard-page.component'
          ).then((m) => m.DashboardPageComponent),
      },

      {
        path: 'pokedex',
        loadComponent: () =>
          import(
            './features/pokedex/pokedex-page/pokedex-page.component'
          ).then((m) => m.PokedexPageComponent),
      },

      {
        path: 'team-builder',
        loadComponent: () =>
          import(
            './features/team-builder/team-builder-page/team-builder-page.component'
          ).then((m) => m.TeamBuilderPageComponent),
      },

      {
        path: 'battles',
        loadComponent: () =>
          import(
            './features/battles/battles-page/battles-page.component'
          ).then((m) => m.BattlesPageComponent),
      },
    ],
  },
];