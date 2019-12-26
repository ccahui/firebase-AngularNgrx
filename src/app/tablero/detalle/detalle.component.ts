import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.reducers';
import { Store, select } from '@ngrx/store';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Observable } from 'rxjs';
import { Transaccion, TipoTransaccion } from '../transaccion.modelo';
import { selectFromTransacciones } from 'src/app/store/transaccion/transaccion.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  transacciones$: Observable<Transaccion[]>;
  tipoTransaccion = TipoTransaccion;
  constructor(private store: Store<AppState>, private transaccionService: IngresoEgresoService) {

  }

  ngOnInit() {
    this.transaccionService.getTransacciones();
    this.transacciones$ = this.store.pipe(select(selectFromTransacciones));
  }

}
