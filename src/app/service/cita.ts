import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { citaApiReponse } from '../models/cita.model';


@Injectable({
  providedIn: 'root',
})
export class Cita {
  // Inyectamos HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);
  // URL base del backend
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.citas}`

  /**
   * Metodo para obtener las citas, devuelve un Observable con la respuesta de la consulta
   * @returns 
   */
  getCita(): Observable<citaApiReponse> {
    // Obtenemos el token de autenticación del localStorage
    const token = localStorage.getItem('token') || '';
    // Creamos los headers con el token para la autenticación
    const headers = new HttpHeaders(token);
    // Hacemos la petición get para obtener las citas, pasando los headers con el token
    return this.http.get<citaApiReponse>(this.URL, { headers });
  }

  getCitaById(id: number): Observable<citaApiReponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<citaApiReponse>(`${this.URL}/${id}`, { headers });
  }

  postCita(c:Cita): Observable<citaApiReponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.post<citaApiReponse>(this.URL, c, { headers });
  }

  patchCita(id: number, c: Cita): Observable<citaApiReponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.patch<citaApiReponse>(`${this.URL}/${id}`, c, { headers });
  }

  deleteCita(id: number): Observable<citaApiReponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.delete<citaApiReponse>(`${this.URL}/${id}`, { headers });
  }
}
