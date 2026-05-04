import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { pacienteApiResponse } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class Paciente {
  //Inject de el http
  private http = inject(HttpClient);
  //Extraemos la ruta del enviorment
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.pacientes}`

  /**
   * Metodo para enviar la peticion de extraer todos los pacientes
   * @returns 
   */
  getPaciente(): Observable<pacienteApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<pacienteApiResponse>(this.URL, { headers });
  }

  /**
   * Metodo para enviar la petición de traer un paciente por su id
   * @param id 
   * @returns 
   */
  getPacienteById(id: number): Observable<pacienteApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<pacienteApiResponse>(`${this.URL}/${id}`, { headers });
  }

  /**
   * Metodo para enviar la peticion de crear un paciente
   * @param p 
   * @returns 
   */
  postPaciente(p: Paciente): Observable<pacienteApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.post<pacienteApiResponse>(this.URL, p, { headers });
  }

  /**
   * Metodo para enviar la peticion de actualizar un paciente
   * @param id 
   * @param p 
   * @returns 
   */
  patchPaciente(id: number, p: Paciente): Observable<pacienteApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.patch<pacienteApiResponse>(`${this.URL}/${id}`, p, { headers });
  }

  /**
   * Metodo para enviar la petición de eliminar un paciente por su id
   * @param id 
   * @returns 
   */
  deletePaciente(id: number): Observable<pacienteApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.delete<pacienteApiResponse>(`${this.URL}/${id}`, { headers });
  }
}