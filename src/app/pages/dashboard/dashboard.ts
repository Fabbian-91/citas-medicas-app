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
  public chart!: Chart;
  public chartEstado!: Chart;

  private dashboard = inject(DashboardSer);

  data!: DashboardData;
  resumenDash!: ResumenDashboard;

  proximasCitas = new MatTableDataSource<CitaDashboard>([]);
  ultimasCitasPasadas = new MatTableDataSource<CitaDashboard>([]);

  citasPorDia: CitasPorDia[] = [];
  citasPorEstado: CitasPorEstado[] = [];

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

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.dashboard.getDashboardData().subscribe({
      next: (res) => {
        this.data = res.data;
        this.resumenDash = res.data.resumen;

        this.proximasCitas.data = res.data.proximasCitas || [];
        this.ultimasCitasPasadas.data = res.data.ultimasCitasPasadas || [];

        this.citasPorDia = res.data.citasPorDia || [];
        this.citasPorEstado = res.data.citasPorEstado || [];

        console.log('Dashboard completo:', res.data);
        console.log('Próximas citas:', this.proximasCitas.data);
        console.log('Últimas citas pasadas:', this.ultimasCitasPasadas.data);

        this.cargarGraficoCitasPorDia();
        this.cargarGraficoCitasPorEstado();
      },
      error: (error) => {
        console.error('Error cargando dashboard:', error);
      }
    });
  }

  cargarGraficoCitasPorDia(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data: {
        labels: this.citasPorDia.map(item => this.traducirDia(item.dia)),
        datasets: [
          {
            label: 'Citas por día',
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

  cargarGraficoCitasPorEstado(): void {
    if (this.chartEstado) {
      this.chartEstado.destroy();
    }

    const activas = this.citasPorEstado.find(item => item.activo === true)?.cantidad ?? 0;
    const inactivas = this.citasPorEstado.find(item => item.activo === false)?.cantidad ?? 0;

    this.chartEstado = new Chart('chartEstado', {
      type: 'doughnut' as ChartType,
      data: {
        labels: ['Activas', 'Inactivas'],
        datasets: [
          {
            label: 'Citas por estado',
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

  traducirDia(dia: string): string {
    const dias: Record<string, string> = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    };

    return dias[dia] || dia;
  }

  formatearHora(hora: string): string {
    return hora ? hora.substring(0, 5) : '';
  }
}