import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../../../service/usuario';
import { UsuarioModel } from '../../../models/usuario.model';


@Component({
  selector: 'app-usuario-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './usuario-lista.html',
  styleUrl: './usuario-lista.scss',
})
export class UsuarioLista implements OnInit, AfterViewInit {
  usuarios:UsuarioModel[]=[];
  displayedColumns: string[] = ['id', 'userName','role','estado','action'];
  dataSource= new MatTableDataSource<UsuarioModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private usuarioService = inject(Usuario);


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp) => {
        this.dataSource.data=resp.data;
        console.log("Categorias Guardadas",resp.data)
      },
      error: (error) => {
        console.log('ERROR:', error);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearModificarCategoria(usuario:any,estado:boolean):void{

  }

  eliminarCategoria(categoria:any){}
}


