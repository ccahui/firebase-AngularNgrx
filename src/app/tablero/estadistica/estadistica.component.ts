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
  ingresosEgresos: {ingresos: number, egresos: number};

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresos$ = this.store.pipe(select(selectIngresosyEgresosObtenidos));
    this.subscripcion = this.ingresosEgresos$.subscribe((ingresosEgresos) => {
      this.ingresosEgresos = ingresosEgresos;
    });
  }
  ngOnDestroy() {
    this.subscripcion.unsubscribe();
    console.log('Unsubcription Grafio');
  }
}
