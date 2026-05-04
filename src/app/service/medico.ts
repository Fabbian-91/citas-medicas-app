import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { medicoApiResponse} from '../models/medico.model';

@Injectable({
  providedIn: 'root',
})
export class Medico {
  //Treaemos la libreria http
  private http = inject(HttpClient);
  //cargamos la ruta desde el envioment
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.medicos}`


  /**
   * Metodo para cosultar todos los medicos
   * @returns 
   */
  getMedico(): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<medicoApiResponse>(this.URL, { headers });
  }

  /**
   * Metodo para consultar medico por su id
   * @param id 
   * @returns 
   */
  getPMedicoById(id: number): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<medicoApiResponse>(`${this.URL}/${id}`, { headers });
  }

  /**
   * Metodo para enviar petición de crear un medico
   * @param m 
   * @returns 
   */
  postMedico(m:Medico): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.post<medicoApiResponse>(this.URL, m, { headers });
  }

  /**
   * Metodo para enviarla petición de actualizar un medico
   * @param id 
   * @param p 
   * @returns 
   */
  patchMedico(id: number, p: Medico): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.patch<medicoApiResponse>(`${this.URL}/${id}`, p, { headers });
  }

  /**
   * Metodo para enviar la peticion de eliminar un medico
   * @param id
   * @returns 
   */
  deleteMedico(id: number): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.delete<medicoApiResponse>(`${this.URL}/${id}`, { headers });
  }
}

