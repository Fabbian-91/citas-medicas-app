import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { medicoApiResponse} from '../models/medico.model';

@Injectable({
  providedIn: 'root',
})
export class Medico {
  private http = inject(HttpClient);
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.medicos}`


  getPaciente(): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<medicoApiResponse>(this.URL, { headers });
  }

  getPacienteById(id: number): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.get<medicoApiResponse>(`${this.URL}/${id}`, { headers });
  }

  postPaciente(m:Medico): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.post<medicoApiResponse>(this.URL, m, { headers });
  }

  patchPaciente(id: number, p: Medico): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.patch<medicoApiResponse>(`${this.URL}/${id}`, p, { headers });
  }

  deletePaciente(id: number): Observable<medicoApiResponse> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders(token);
    return this.http.delete<medicoApiResponse>(`${this.URL}/${id}`, { headers });
  }
}

