import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../../../service/usuario';
import { UsuarioModel } from '../../../models/usuario.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioForm } from '../usuario-form/usuario-form';
import { ToastrService } from 'ngx-toastr';
import { userRole } from '../../../shared/enums/enum';

@Component({
  selector: 'app-usuario-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './usuario-lista.html',
  styleUrl: './usuario-lista.scss',
})
export class UsuarioLista implements OnInit, AfterViewInit {
  //Arreglo para cargar usuarios
  usuarios: UsuarioModel[] = [];
  //Datos de las columnas del usuario
  displayedColumns: string[] = ['id', 'userName', 'role', 'estado', 'action'];
  //Data Source de la tabla de usuario
  dataSource = new MatTableDataSource<UsuarioModel>([]);
  private toastr = inject(ToastrService);
  private rol = localStorage.getItem("rol");

  dialogRef!: MatDialogRef<UsuarioForm>;

  //Inject de dialog para modal
  private dialog = inject(MatDialog);
  //Inject del servicio de usuario
  private usuarioService = inject(Usuario);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Cargar los usuario apenas el componenete se inicie
  ngOnInit(): void {
    this.loadUsuario();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Metodo para cargar los datos del usurio al componente
   */
  loadUsuario(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp) => {
        this.usuarios = resp.data;
        this.dataSource.data = resp.data;

        console.log('Usuarios cargados:', resp.data);
      },
      error: (error) => {
        console.log('ERROR al cargar usuarios:', error);
      }
    });
  }

  /**
   * Metodo para filtrar usuarios
   * @param event 
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Metodo para crear y modificar usuario
   * @param usuario 
   * @param isMod 
   */
  crearModificarUsuario(usuario: UsuarioModel | null, isMod: boolean): void {
    //Generamos el modal deacuerdo a la acción del usuario
    if (!isMod) {
      this.dialogRef = this.dialog.open(UsuarioForm, {
        width: '600px',
        height: '530px',
        data: {
          usuario,
          isModificar: isMod
        },
      });
    } else {
      this.dialogRef = this.dialog.open(UsuarioForm, {
        width: '600px',
        height: '650px',
        data: {
          usuario,
          isModificar: isMod
        },
      });
    }

    this.dialogRef.afterClosed().subscribe((result) => {
      //Validamos si despues de cerrar el modal el result tiene datos
      if (!result) {
        return;
      }

      //Condición para crear un núevo usuario
      if (isMod && usuario?.id) {
        //Llamamos al patch de usarios par modificar
        this.usuarioService.patchUsuario(usuario.id, result).subscribe({
          //Esperamos respuestas
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (error) => {
            this.toastr.error('Error al actualizar usuario');
          }
        });
      } else {
        //Llamamos al servicio de agregar
        this.usuarioService.postUsuario(result).subscribe({
          //Esperamos respuesta
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (err) => {
            this.toastr.error('Error al crear usuario');
          }
        });
      }
    });
  }

  /**
   * Metodo para eliminar un usuario
   * @param usuario 
   * @returns 
   */
  eliminarUsuario(usuario: UsuarioModel): void {
    //Validamos si el id de usuaruario no vienen definido
    if (usuario.id === undefined || usuario.id === null) {
      console.error('El usuario no tiene ID');
      return;
    }

    //Validamos la respuesta del usuario para eliminar 
    if (confirm(`¿Estás seguro de eliminar el usuario "${usuario.email}"?`)) {
      //Llamamos al servicio de elminar
      this.usuarioService.deleteUsuario(usuario.id).subscribe({
        //Esperamos respuesta
        next: (resp) => {
          this.toastr.success(resp.message);
          this.loadUsuario();
        },
        error: (error) => {
          this.toastr.error('Error al eliminar usuario');
        },
      });
    }
  }
  validarRol(): boolean {
    return this.rol !== userRole.RECEPCIONISTA;
  }
}