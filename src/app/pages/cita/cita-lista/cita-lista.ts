import { Component, inject, ViewChild } from '@angular/core';
import { CitaModel } from '../../../models/cita.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cita } from '../../../service/cita';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CitaForm } from '../cita-form/cita-form';
import { ToastrService } from 'ngx-toastr';
import { userRole } from '../../../shared/enums/enum';

@Component({
  selector: 'app-cita-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './cita-lista.html',
  styleUrl: './cita-lista.scss',
})
export class CitaLista {
  //Variable para recibir todas la citas
  citas: CitaModel[] = [];
  //Campos de la tabla
  displayedColumns: string[] = ['id', 'fecha', 'hora', 'motivo', 'estado', 'observaciones', 'paciente', 'medico', 'action'];
  //datos de la tabla
  dataSource = new MatTableDataSource<CitaModel>([]);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //inject de cita para acceder al servicio
  private CitaService = inject(Cita);
  //inject de Toastr para mostrar notificaciones al usuario
  private toastr = inject(ToastrService);
  //variable para traer el rol de usuario
  private rol = localStorage.getItem("rol");
  //inject del modal del formulario
  private dialog = inject(MatDialog);
  //modal de referencia
  dialogRef!: MatDialogRef<CitaForm>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Metodo para cargar los datos apenas se inicie el componente
   */
  ngOnInit(): void {
    this.loadCita();
  }

  /**
   * Metodo para cargar todas las citas
   */
  loadCita(): void {
    //accedemos al servicio y nos sucribimos
    this.CitaService.getCita().subscribe({
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
 * Método para crear y modificar cita
 * @param cita 
 * @param isMod 
 */
  crearModificarCita(cita: CitaModel | null, isMod: boolean): void {
    this.dialogRef = this.dialog.open(CitaForm, {
      width: '600px',
      height: isMod ? '600px' : '700px',
      data: {
        cita: cita,
        isModificar: isMod
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      console.log('Resultado recibido del modal:', result);

      if (isMod && cita?.id) {
        this.CitaService.patchCita(cita.id, result).subscribe({
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadCita();
          },
          error: (error) => {
            this.toastr.error("Error al actualizar una cita");
          }
        });
      } else {
        this.CitaService.postCita(result).subscribe({
          next: (resp) => {
            this.toastr.success(resp.message);
            this.loadCita();
          },
          error: (err) => {
            this.toastr.error("Error al crear una cita");
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
  eliminarCita(cita: CitaModel): void {
    //Validamos si el id de usuaruario no vienen definido
    if (cita.id === undefined || cita.id === null) {
      console.error('El usuario no tiene ID');
      return;
    }

    //Validamos la respuesta del usuario para eliminar 
    if (confirm(`¿Estás seguro de eliminar la cita "${cita.id}-${cita.fecha}"?`)) {
      //Llamamos al servicio de elminar
      this.CitaService.deleteCita(cita.id).subscribe({
        //Esperamos respuesta
        next: (resp) => {
          this.toastr.success(resp.message);
          this.loadCita();
        },
        error: (error) => {
          this.toastr.error("Error al eliminar una cita");
        },
      });
    }
  }

  validarRol(): boolean {
    return this.rol !== userRole.RECEPCIONISTA;
  }
}
