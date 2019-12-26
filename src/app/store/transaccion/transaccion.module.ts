import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromTransaccion from './transaccion.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromTransaccion.TransaccionFeatureKey, fromTransaccion.TransaccionReducer)
  ],
})
export class TransaccionReduxModule {}
