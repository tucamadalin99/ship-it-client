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
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
    ],
  },

  // fallback
  { path: '**', redirectTo: '' },
];
