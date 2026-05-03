import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material-impors';
import { Auth } from '../../service/auth';
import { userRole } from '../../shared/enums/enum';

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
  private rol = localStorage.getItem("rol");

  cerrar() {
    //Cerramos la sesion
    this.authService.logout();
    //Generamos una núeva ruta
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  validarRol(): boolean {
    return this.rol !== userRole.RECEPCIONISTA;
  }

}