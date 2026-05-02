import { Routes } from '@angular/router';
import { UsuarioLista } from './pages/usuario/usuario-lista/usuario-lista';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioLista }, { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
  { path: 'usuarios', loadComponent: () => import('./pages/usuario/usuario-lista/usuario-lista').then(m => m.UsuarioLista) },
  { path: 'pacientes', loadComponent: () => import('./pages/paciente/paciente-lista/paciente-lista').then(m => m.PacienteLista) },
  { path: 'medicos', loadComponent: () => import('./pages/medico/medico-lista/medico-lista').then(m => m.MedicoLista) },
  { path: 'citas', loadComponent: () => import('./pages/cita/cita-lista/cita-lista').then(m => m.CitaLista) },
  { path: 'dashboards', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
];
