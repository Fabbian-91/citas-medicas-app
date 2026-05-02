import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-impors';
import { Usuario } from '../../service/usuario';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  usuario: string | null = null;
  rol?: string | null;



  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    const roleStorage = localStorage.getItem('rol');

    if (roleStorage) {
      this.rol = roleStorage.charAt(0).toUpperCase() + roleStorage.slice(1).toLowerCase();
    }

  }
}