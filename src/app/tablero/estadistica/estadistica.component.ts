import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { selectIngresosyEgresosObtenidos } from '../../store/transaccion/transaccion.reducer';
/* GRAFICO BARRA */
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresosEgresos$: Observable<{ ingresos: number, egresos: number }>;
  subscripcion: Subscription;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2019'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Ingresos' },
    { data: [], label: 'Egresos' }
  ];

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresos$ = this.store.pipe(select(selectIngresosyEgresosObtenidos));
    this.subscripcion = this.ingresosEgresos$.subscribe((ingresosEgresos) => {
      this.barChartData = [
        { data: [ingresosEgresos.ingresos], label: 'Ingresos' },
        { data: [ingresosEgresos.egresos], label: 'Egresos' }
      ];
    });
  }
  ngOnDestroy() {
    this.subscripcion.unsubscribe();
    console.log('Unsubcription Grafio');
  }
}
