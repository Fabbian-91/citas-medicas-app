import { Component, inject, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { PacienteModel } from '../../../models/paciente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Paciente } from '../../../service/paciente';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PacienteForm } from '../paciente-form/paciente-form';
import { ToastrService } from 'ngx-toastr';
import { userRole } from '../../../shared/enums/enum';

@Component({
  selector: 'app-paciente-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './paciente-lista.html',
  styleUrl: './paciente-lista.scss',
})
export class PacienteLista {
  pacientes: PacienteModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'cedula', 'telefono', 'estado', 'action'];
  dataSource = new MatTableDataSource<PacienteModel>([]);
  dialogRef!: MatDialogRef<PacienteForm>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Inject de dialog para modal
  private dialog = inject(MatDialog);
  private pacienteService = inject(Paciente);
  private toastr = inject(ToastrService);
  private rol = localStorage.getItem("rol");



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario(): void {
    this.pacienteService.getPaciente().subscribe({
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
  crearModificarPaciente(paciente: PacienteModel | null, isMod: boolean): void {
    //Generamos el modal deacuerdo a la acción del usuario
    if (!isMod) {
      this.dialogRef = this.dialog.open(PacienteForm, {
        width: '600px',
        height: '530px',
        data: {
          paciente,
          isModificar: isMod
        },
      });
    } else {
      this.dialogRef = this.dialog.open(PacienteForm, {
        width: '600px',
        height: '650px',
        data: {
          paciente,
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
      if (isMod && paciente?.id) {
        //Llamamos al patch de usarios par modificar
        this.pacienteService.patchPaciente(paciente.id, result).subscribe({
          //Esperamos respuestas
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (error) => {
            this.toastr.error("Error al actualizar paciente");
          }
        });
      } else {
        //Llamamos al servicio de agregar
        this.pacienteService.postPaciente(result).subscribe({
          //Esperamos respuesta
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadUsuario();
          },
          error: (err) => {
            this.toastr.error("Error al crear paciente");
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
  eliminarPaciente(paciente: PacienteModel): void {
    //Validamos si el id de usuaruario no vienen definido
    if (paciente.id === undefined || paciente.id === null) {
      console.error('El usuario no tiene ID');
      return;
    }

    //Validamos la respuesta del usuario para eliminar 
    if (confirm(`¿Estás seguro de eliminar el paciente "${paciente.nombre}-${paciente.cedula}"?`)) {
      //Llamamos al servicio de elminar
      this.pacienteService.deletePaciente(paciente.id).subscribe({
        //Esperamos respuesta
        next: (resp) => {
          this.toastr.success(resp.message);
          this.loadUsuario();
        },
        error: (error) => {
          this.toastr.error("Error al eliminar paciente");
        },
      });
    }
  }

  validarRol(): boolean {
    return this.rol !== userRole.RECEPCIONISTA;
  }

}
