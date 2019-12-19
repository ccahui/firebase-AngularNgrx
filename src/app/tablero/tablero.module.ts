import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero.component';
import { CompartirModule } from '../compartir/compartir.module';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [TableroComponent, IngresoEgresoComponent, EstadisticaComponent, DetalleComponent],
  imports: [
    CommonModule,
    TableroRoutingModule,
    CompartirModule,
  ]
})
export class TableroModule { }
