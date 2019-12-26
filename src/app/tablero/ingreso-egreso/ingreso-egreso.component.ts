import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoTransaccion } from '../transaccion.modelo';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { selectFromIULoading } from '../../store/iu/iu.reducer';
import { desactivarLoading } from '../../store/iu/iu.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  loading$: Observable<boolean>;
  transaccionForm: FormGroup;
  tiposTransaccion: TipoTransaccion[] = [TipoTransaccion.EGRESO, TipoTransaccion.INGRESO];
  constructor(private fb: FormBuilder, private store: Store<AppState>, private ingresoEgreso: IngresoEgresoService) { }

  ngOnInit() {
    this.crearFormulario();
    this.inicializarConDatosFormulario();
    this.loading$ = this.store.pipe(select(selectFromIULoading));
  }




  crearFormulario() {
    this.transaccionForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
      tipo: ['', [Validators.required]]
    });
  }

  inicializarConDatosFormulario() {
    const data = {
      descripcion: 'Gastos por ...',
      monto: 150,
      tipo: TipoTransaccion.EGRESO,
    };
    this.transaccionForm.setValue(data);
  }

  transaccion() {
    this.ingresoEgreso.transaccion(this.transaccionForm.value).then((resp) => {
      this.store.dispatch(desactivarLoading());
      this.transaccionForm.reset({
        monto: 0,
        tipo: this.transaccionForm.get('tipo').value
      });
    }).catch(error => {
      this.store.dispatch(desactivarLoading());
      Swal.fire('Transaccion', error.message, 'error');
      console.log(error);
    });
  }


}
