import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-impors';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  //injectamos la router
  private router = inject(Router);
  //injectamos el servicios
  private authService = inject(Auth);

  cerrar() {
    //Cerramos la sesion
    this.authService.logout();
    //Generamos una núeva ruta
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}