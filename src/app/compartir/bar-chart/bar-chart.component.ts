import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: []
})
export class BarChartComponent implements OnInit {

  @Input()
  set ingresosEgresos(ingresosEgresos: { ingresos: number, egresos: number }) {
    if (ingresosEgresos) {
      this.actualizarIngresos(ingresosEgresos);
    }
  }

  barChartOptions: ChartOptions;
  barChartLabels: Label[] = ['2019'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Ingresos' },
    { data: [], label: 'Egresos' },
  ];

  constructor() { }

  ngOnInit() {
    this.graficoOptions();
  }
  graficoOptions() {
    this.barChartOptions = {
      responsive: true,
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
  }

  private actualizarIngresos(ingresosEgresos) {

    const ingresos = [ingresosEgresos.ingresos];
    const egresos = [ingresosEgresos.egresos];

    this.barChartData[0].data = ingresos;
    this.barChartData[1].data = egresos;
  }


}

