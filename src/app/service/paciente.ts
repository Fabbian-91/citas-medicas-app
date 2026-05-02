import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { pacienteApiResponse } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class Paciente {

  private http=inject(HttpClient);
  private URL=`${enviorment.apiUrl}${enviorment.endpoints.pacientes}`

  getPaciente():Observable<pacienteApiResponse>{
    const token=localStorage.getItem('token') || '';
    const headers=new HttpHeaders(token);
    return this.http.get<pacienteApiResponse>(this.URL,{headers});
  }

  getPacienteById(id:number):Observable<pacienteApiResponse>{
    const token=localStorage.getItem('token') || '';
    const headers=new HttpHeaders(token);
    return this.http.get<pacienteApiResponse>(`${this.URL}/${id}`,{headers});
  }

  postPaciente(p:Paciente):Observable<pacienteApiResponse>{
    const token=localStorage.getItem('token') || '';
    const headers=new HttpHeaders(token);
    return this.http.post<pacienteApiResponse>(this.URL,p,{headers});
  }

  patchPaciente(id:number, p:Paciente):Observable<pacienteApiResponse>{
    const token=localStorage.getItem('token') || '';
    const headers=new HttpHeaders(token);
    return this.http.patch<pacienteApiResponse>(`${this.URL}/${id}`, p, {headers});
  }

  deletePaciente(id:number):Observable<pacienteApiResponse>{
    const token=localStorage.getItem('token') || '';
    const headers=new HttpHeaders(token);
    return this.http.delete<pacienteApiResponse>(`${this.URL}/${id}`, {headers});
  }
}