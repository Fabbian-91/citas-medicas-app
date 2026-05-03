import { Component, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-impors';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  public chart!: Chart;
  public chartEstado!: Chart;

  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit(): void {
    const dataDias = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      datasets: [
        {
          label: 'Citas por día',
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data: dataDias,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const dataEstado = {
      labels: ['Activas', 'Inactivas'],
      datasets: [
        {
          label: 'Citas por estado',
          data: [4, 0],
          backgroundColor: [
            'rgb(45, 182, 216)',
            'rgb(233, 49, 89)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    this.chartEstado = new Chart('chartEstado', {
      type: 'doughnut' as ChartType,
      data: dataEstado,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  ];
}