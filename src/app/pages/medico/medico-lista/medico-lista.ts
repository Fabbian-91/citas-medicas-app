import { Component, inject, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MedicoModel } from '../../../models/medico.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from '../../../service/medico';

@Component({
  selector: 'app-medico-lista',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './medico-lista.html',
  styleUrl: './medico-lista.scss',
})
export class MedicoLista {
  usuarios: MedicoModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'especialidad','estado', 'action'];
  dataSource = new MatTableDataSource<MedicoModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private pacienteService = inject(Medico);


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
