import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { selectIngresosyEgresosObtenidos } from '../../store/transaccion/transaccion.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresosEgresos$: Observable<{ ingresos: number, egresos: number }>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresosEgresos$ = this.store.pipe(select(selectIngresosyEgresosObtenidos));
  }

}
