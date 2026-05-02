import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviorment } from '../../enviormets';
import { Observable } from 'rxjs';
import { usuarioApiResponse } from '../models/usuario.model';


@Injectable({
  providedIn: 'root',
})
export class Usuario {
  //injetion de dependecias del HttpClient
  private http = inject(HttpClient);

  //Url 
  private URL = `${enviorment.apiUrl}${enviorment.endpoints.usuarios}`;

  /**
   * Metedo para traer el observable del get de usuarios 
   * @returns Observable<usuarioApiResponse>
   */
  getUsuarios(): Observable<usuarioApiResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token: token });
    //Hacemos consulta y le pasamos el token por su header
    return this.http.get<usuarioApiResponse>(this.URL, { headers });
  }

  /**
   * Metedo para traer el observable del getById de usuario
   * @returns Observable<usuarioApiResponse>
   */
  getUsuariosById(id: number): Observable<usuarioApiResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token: token });
    //Hacemos consulta y le pasamos el token por su header y el id por la Url de la consulta
    return this.http.get<usuarioApiResponse>(`${this.URL}/${id}`, { headers });
  }

  /**
   * Metodo para traer el obserbable del post de usuario
   * @param u 
   * @returns Observable<usarioApiResponse>
   */
  postUsuario(u: Usuario): Observable<usuarioApiResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token: token });
    //Hacemos consulta y le pasamos el token por su header y el núevo usuario
    return this.http.post<usuarioApiResponse>(this.URL, u, { headers })
  }

  patchUsuario(id: number, u: Usuario): Observable<usuarioApiResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token });
    //Hacemos consulta y le pasamos el token por su header, su id por la Url y su usuario en body
    return this.http.patch<usuarioApiResponse>(`${this.URL}/${id}`, u, { headers });
  }

  deleteUsuario(id: number): Observable<usuarioApiResponse> {
    //Extraemos el token del local storage
    const token = localStorage.getItem('token') || '';
    //Generamos un nuevo httpHeader para guardar el token
    const headers = new HttpHeaders({ token: token });
    //Hacemos consulta y le pasamos el token por su header y el id por la Url
    return this.http.delete<usuarioApiResponse>(`${this.URL}/${id}`, { headers });
  }

}
