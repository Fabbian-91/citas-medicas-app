import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-impors';
import { Chart, ChartType } from 'chart.js/auto';
import { MatTableDataSource } from '@angular/material/table';

import { DashboardSer } from '../../service/dashboard';
import {
  CitaDashboard,
  CitasPorDia,
  CitasPorEstado,
  DashboardData,
  ResumenDashboard
} from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  //inject de Chart para poder usar la libreria de grafica
  public chart!: Chart;
  public chartEstado!: Chart;

  //inject de servicio de dasboard
  private dashboard = inject(DashboardSer);

  //Datos para recibir el json de el dashboard
  data!: DashboardData;
  resumenDash!: ResumenDashboard;

  proximasCitas = new MatTableDataSource<CitaDashboard>([]);
  ultimasCitasPasadas = new MatTableDataSource<CitaDashboard>([]);

  citasPorDia: CitasPorDia[] = [];
  citasPorEstado: CitasPorEstado[] = [];

  //Tabla de las proximas citas
  displayedColumnsProximas: string[] = [
    'id',
    'fecha',
    'hora',
    'paciente',
    'cedula',
    'telefono',
    'medico',
    'especialidad'
  ];

  //Tablas de la citas pasadas
  displayedColumnsPasadas: string[] = [
    'id',
    'fecha',
    'hora',
    'paciente',
    'cedula',
    'telefono',
    'medico',
    'especialidad'
  ];

  /**
   * cargar el dashboard apenas el componente se inicialice
   */
  ngOnInit(): void {
    this.loadDashboard();
  }

  /**
   * Metodo para cargar el dashboard
   */
  loadDashboard(): void {
    this.dashboard.getDashboardData().subscribe({
      next: (res) => {
        //Traemos los datos
        this.data = res.data;
        this.resumenDash = res.data.resumen;

        this.proximasCitas.data = res.data.proximasCitas || [];
        this.ultimasCitasPasadas.data = res.data.ultimasCitasPasadas || [];

        this.citasPorDia = res.data.citasPorDia || [];
        this.citasPorEstado = res.data.citasPorEstado || [];

        console.log('Dashboard completo:', res.data);
        console.log('Próximas citas:', this.proximasCitas.data);
        console.log('Últimas citas pasadas:', this.ultimasCitasPasadas.data);

        //cargamos los graficos
        this.cargarGraficoCitasPorDia();
        this.cargarGraficoCitasPorEstado();
      },
      error: (error) => {
        console.error('Error cargando dashboard:', error);
      }
    });
  }

  /**
   *Metodo para cargar la grafica por dia
   */
  cargarGraficoCitasPorDia(): void {
    //destruimos la grafica cada ves que se inialice el componente para que vuelva a cargar con los datos
    if (this.chart) {
      this.chart.destroy();
    }

    //Generamos su ingancia
    this.chart = new Chart('chart', {
      //Indicamos tipo de grafico
      type: 'line' as ChartType,
      data: {
        //Cargamos sus días
        labels: this.citasPorDia.map(item =>item.dia),
        datasets: [
          {
            //Cargamos sus datos
            label: 'Citas por día',
            //Cargamos la cantidad de días
            data: this.citasPorDia.map(item => item.cantidad),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
  }

/**
 * Metodo para cargar el grafico de pastel
 */
  cargarGraficoCitasPorEstado(): void {
    //creamos uno núevo cada ves que se incialice el componente
    if (this.chartEstado) {
      this.chartEstado.destroy();
    }

    //cargamos los datos de la grafica
    const activas = this.citasPorEstado.find(item => item.activo === true)?.cantidad ?? 0;
    const inactivas = this.citasPorEstado.find(item => item.activo === false)?.cantidad ?? 0;

    //intaciamos la núeva grafica
    this.chartEstado = new Chart('chartEstado', {
      type: 'doughnut' as ChartType,
      data: {
        //colocamos su labels
        labels: ['Activas', 'Inactivas'],
        datasets: [
          {
            label: 'Citas por estado',
            //cargamos la cantidad de activas y inactivas
            data: [activas, inactivas],
            backgroundColor: [
              'rgb(45, 182, 216)',
              'rgb(233, 49, 89)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
  }
  
  /**
   * Metodo para formatear la hora
   * @param hora 
   * @returns 
   */
  formatearHora(hora: string): string {
    return hora ? hora.substring(0, 5) : '';
  }
}