import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './tablero.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: TableroComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EstadisticaComponent },
      { path: 'ingreso-egreso', component: IngresoEgresoComponent },
      { path: 'detalles', component: DetalleComponent },
      { path: 'perfil', component: PerfilComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroRoutingModule { }
