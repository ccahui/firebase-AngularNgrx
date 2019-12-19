import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './tablero.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';


const routes: Routes = [
  {
    path: '', component: TableroComponent,
    children: [
      { path: '', component: IngresoEgresoComponent },
      { path: 'detalle', component: DetalleComponent },
      { path: 'estadistica', component: EstadisticaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroRoutingModule { }
