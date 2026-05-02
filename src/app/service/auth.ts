import { HttpClient,HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginModel, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Inyectamos HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);

  // Inyectamos PLATFORM_ID para saber si estamos en navegador
  private platformId = inject(PLATFORM_ID);

  // URL base del backend
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.auth}`;

  //signal para almacenar el token de autenticación
  private tokenSignal = signal<string | null>(
    isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null
  );

  //Validamos si el usuario está logueado o no, revisando la signal del token y el localStorage
  isLoggedIn = computed(() => {
    const token = this.tokenSignal();

    // Si la signal tiene token, el usuario está logueado
    if (token) {
      return true;
    }

    // Si estamos en navegador, revisamos si hay token guardado en localStorage
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }

    // Si no hay token, no está logueado
    return false;
  });

  /**
   * Metodo para hacer login, recibe un objeto con el username y password,
   * devuelve un Observable con la respuesta de la consulta, token y los datos del usuario
   * @param datos 
   * @returns 
   */
  login(datos: LoginModel): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.URL}/login`, datos, {
      observe: 'response',
    });
  }

  /**
   * Metodo para guardar la sesión del usuario
   * @param body 
   * @param token 
   * @returns 
   */
  saveSession(body: LoginResponse, token: string | null): void {

    // Solo usamos localStorage si estamos en navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // El token final se obtiene de la signal, del body o del localStorage
    const tokenFinal =
      token ||
      body.token ||
      localStorage.getItem('token');

    // Si no hay token, no podemos guardar sesión
    if (!tokenFinal) {
      console.error('No se recibió token para guardar sesión');
      return;
    }

    // Guardamos el token en localStorage
    localStorage.setItem('token', tokenFinal);

    // Guardamos otros datos útiles del usuario
    localStorage.setItem('usuario', body.usuario.nombre);
    localStorage.setItem('rol', body.usuario.rol);

    // Actualizamos la signal con el token final
    this.tokenSignal.set(tokenFinal);
  }

  /**
   * Metodo para cerrar sesión, elimina el token y datos del usuario del localStorage y limpia el signal
   */
  logout(): void {

    // Solo usamos localStorage si estamos en navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');
    }

    // Limpiamos la signal
    this.tokenSignal.set(null);
  }

  /**
   * Metodo para devolver el token de autenticación
   * @returns 
   */
  getToken(): string | null {

    // Primero intentamos obtener el token desde la signal
    const token = this.tokenSignal();

    // Si existe en la signal, lo devolvemos
    if (token) {
      return token;
    }

    // Si estamos en navegador, intentamos obtenerlo desde localStorage
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }

    // Si no existe token, devolvemos null
    return null;
  }

  /**
   * Metodo para devolver el id del usuario guardado
   * @returns 
   */
  getUsuario(): string | null {

    // Solo usamos localStorage si estamos en navegador
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('usuario');
    }

    return null;
  }
}
