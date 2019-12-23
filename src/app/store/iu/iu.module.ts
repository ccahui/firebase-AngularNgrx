import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromIU from './iu.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromIU.IUFeatureKey, fromIU.IUReducer)
  ],
})
export class IUReduxModule {}