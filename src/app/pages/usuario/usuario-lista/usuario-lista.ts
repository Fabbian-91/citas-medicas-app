import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../service/usuario';

@Component({
  selector: 'app-usuario-lista',
  imports: [],
  templateUrl: './usuario-lista.html',
  styleUrl: './usuario-lista.scss',
})
export class UsuarioLista implements OnInit {
  private usuarioService = inject(Usuario);

  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp) => {
        console.log(resp.message, resp.data);
      },
      error: (error) => {
        console.log('ERROR:', error);
      }
    });
  }
}
