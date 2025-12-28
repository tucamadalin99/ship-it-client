import { Routes } from '@angular/router';
import { Shell } from './core/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),
      },
    ],
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFound),
  },
  // fallback
  { path: '**', redirectTo: 'not-found' },
];
