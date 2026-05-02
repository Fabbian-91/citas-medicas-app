import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../service/auth';

/**
 * Guard para proteger las rutas, verifica si el usuario está logueado revisando el token en el servicio de autenticación
 * @param route 
 * @param state 
 * @returns 
 */
export const authGuard: CanActivateFn = (route, state) => {
  //injectamos el servicio de autenticación
  const authService = inject(Auth);
  //injectamos el router
  const router = inject(Router);

  //validamos si el usario esta logueado
  const logged = authService.isLoggedIn();


  // imprimimos el token
  console.log('Token:', localStorage.getItem('token'));

  //valdamos si esta logueado, si no lo está redirigimos al login
  if (!logged) {
    return router.createUrlTree(['/login']);
  }
  
  return true;
};