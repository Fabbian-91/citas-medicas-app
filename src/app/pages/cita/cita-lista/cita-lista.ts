import { Component, inject, ViewChild } from '@angular/core';
import { CitaModel } from '../../../models/cita.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cita } from '../../../service/cita';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';

@Component({
  selector: 'app-cita-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './cita-lista.html',
  styleUrl: './cita-lista.scss',
})
export class CitaLista {
  usuarios: CitaModel[] = [];
  displayedColumns: string[] = ['id', 'fecha','hora','motivo','estado','observaciones','paciente', 'medico','action'];
  dataSource = new MatTableDataSource<CitaModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private CitaService = inject(Cita);


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario(): void {
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

  crearModificarCategoria(usuario: any, estado: boolean): void {

  }

  eliminarCategoria(categoria: any) { }
}
