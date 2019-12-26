import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from './ingreso-egreso.service';

export declare function init_plugins();

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styles: []
})

export class TableroComponent implements OnInit, OnDestroy {

  constructor(private serviceTransaccion: IngresoEgresoService) { }

  ngOnInit() {
    init_plugins();
    this.serviceTransaccion.getTransacciones();
  }
  ngOnDestroy(){
    this.serviceTransaccion.cancelarSubscriptionTransacciones();
  }

}
