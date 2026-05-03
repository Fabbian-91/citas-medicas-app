import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { DashboardResponse } from '../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardSer {
  //injetion de dependecias del HttpClient
  private http = inject(HttpClient);

  //Url 
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.dashboard}`;

  /**
   * Metedo para traer el observable del get de usuarios 
   * @returns Observable<DashboardResponse>
   */
  getDashboardData(): Observable<DashboardResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token: token });
    //Hacemos consulta y le pasamos el token por su header
    return this.http.get<DashboardResponse>(this.URL, { headers });
  }

}
