import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then(m => m.Login)
  },

  // Rutas protegidas dentro del layout
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout/layout').then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuario/usuario-lista/usuario-lista').then(m => m.UsuarioLista)
      },
      {
        path: 'pacientes',
        loadComponent: () =>
          import('./pages/paciente/paciente-lista/paciente-lista').then(m => m.PacienteLista)
      },
      {
        path: 'medicos',
        loadComponent: () =>
          import('./pages/medico/medico-lista/medico-lista').then(m => m.MedicoLista)
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./pages/cita/cita-lista/cita-lista').then(m => m.CitaLista)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];