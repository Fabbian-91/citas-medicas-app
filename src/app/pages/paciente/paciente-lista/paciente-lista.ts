import { Component, inject, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { PacienteModel } from '../../../models/paciente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Paciente } from '../../../service/paciente';

@Component({
  selector: 'app-paciente-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './paciente-lista.html',
  styleUrl: './paciente-lista.scss',
})
export class PacienteLista {
  usuarios: PacienteModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'cedula', 'telefono','estado', 'action'];
  dataSource = new MatTableDataSource<PacienteModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private pacienteService = inject(Paciente);


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

  crearModificarCategoria(usuario: any, estado: boolean): void {

  }

  eliminarCategoria(categoria: any) { }

}
