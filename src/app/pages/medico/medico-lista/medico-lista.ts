import { Component, inject, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MedicoModel } from '../../../models/medico.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from '../../../service/medico';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MedicoForm } from '../medico-form/medico-form';
import { ToastrService } from 'ngx-toastr';
import { userRole } from '../../../shared/enums/enum';

@Component({
  selector: 'app-medico-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './medico-lista.html',
  styleUrl: './medico-lista.scss',
})
export class MedicoLista {
  //Arreglo para listar todos los medicos
  medicos: MedicoModel[] = [];
  //columnas de la tabla
  displayedColumns: string[] = ['id', 'nombre', 'especialidad', 'estado', 'action'];
  //Datos de la tabla
  dataSource = new MatTableDataSource<MedicoModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //Inject de dialog para modal
  private dialog = inject(MatDialog);
  //Creamos el dialogo de referencia
  dialogRef!: MatDialogRef<MedicoForm>;
  //Traemos el servicio de medico
  private medicoService = inject(Medico);
  //Cargamos el servicio para las notificaciones
  private toastr = inject(ToastrService);
  //Cargamos el rol del local storage para las directivas
  private rol=localStorage.getItem("rol");


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Metodo para cargar la tabla de usuarios al inicializar el componente
   */
  ngOnInit(): void {
    this.loadUsuario();
  }

  /**
   * Meetodo para cargar la tabla de usuarios
   */
  loadUsuario(): void {
    this.medicoService.getMedico().subscribe({
      next: (resp) => {
        this.dataSource.data = resp.data;
        console.log("Categorias Guardadas", resp.data)
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

  /**
       * Metodo para crear y modificar usuario
       * @param usuario 
       * @param isMod 
       */
  crearModificarMedico(medico: MedicoModel | null, isMod: boolean): void {
    //Generamos el modal deacuerdo a la acción del usuario
    if (!isMod) {
      this.dialogRef = this.dialog.open(MedicoForm, {
        width: '600px',
        height: '450px',
        data: {
          medico,
          isModificar: isMod
        },
      });
    } else {
      this.dialogRef = this.dialog.open(MedicoForm, {
        width: '600px',
        height: '550px',
        data: {
          medico,
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
      if (isMod && medico?.id) {
        //Llamamos al patch de usarios par modificar
        this.medicoService.patchMedico(medico.id, result).subscribe({
          //Esperamos respuestas
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (error) => {
            this.toastr.error("Error al actualizar un medico");
          }
        });
      } else {
        //Llamamos al servicio de agregar
        this.medicoService.postMedico(result).subscribe({
          //Esperamos respuesta
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (err) => {
            this.toastr.error("Error al crear un medico");
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
  eliminarMedico(medico: MedicoModel): void {
    //Validamos si el id de usuaruario no vienen definido
    if (medico.id === undefined || medico.id === null) {
      console.error('El usuario no tiene ID');
      return;
    }

    //Validamos la respuesta del usuario para eliminar 
    if (confirm(`¿Estás seguro de eliminar el medico "${medico.nombre}-${medico.especialidad}"?`)) {
      //Llamamos al servicio de elminar
      this.medicoService.deleteMedico(medico.id).subscribe({
        //Esperamos respuesta
        next: (resp) => {
          this.toastr.success(resp.message);
          this.loadUsuario();
        },
        error: (error) => {
          this.toastr.error("Error al eliminar un medico");
        },
      });
    }
  }

  /**
   * Metodo para valiar el rol y usar su valor en las directivas
   * @returns 
   */
  validarRol():boolean{
    return this.rol!==userRole.RECEPCIONISTA;
  }
}
