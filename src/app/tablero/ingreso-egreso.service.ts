import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaccion } from './transaccion.modelo';
import { AuthService } from '../auth/auth.service';

import Swal from 'sweetalert2';
import { AppState } from '../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { activarLoading, desactivarLoading } from '../store/iu/iu.actions';
import { selectFromAuthUsuario } from '../store/auth/auth.reducer';
import { filter, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Usuario } from '../auth/user.modelo';
import { setTransacciones } from '../store/transaccion/transaccion.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  subscription: Subscription = new Subscription();
  constructor(private angularFirestore: AngularFirestore, private auth: AuthService, private store: Store<AppState>) {
  }

  transaccion(data: Transaccion) {

    const user = this.auth.getUser();
    this.store.dispatch(activarLoading());
    return this.angularFirestore.collection('usuarios').doc(user.uid).collection('transacciones').add({ data });

  }
  getTransacciones() {
    this.subscription = this.store.pipe(select(selectFromAuthUsuario)).pipe(
      filter(auth => auth != null),
      switchMap(auth => {
        return this.angularFirestore.collection('usuarios').doc(auth.uid).collection('transacciones').snapshotChanges();
      }),
      map((docData: any[]) => {
        return docData.map(doc => {
          return { uid: doc.payload.doc.id, ...doc.payload.doc.data().data };
        });
      })
    ).subscribe(data => {
      console.log(data);
      this.store.dispatch(setTransacciones({ transacciones: data }));
    });

  }

  cancelarSubscriptionTransacciones() {
    console.log('UNSUBCRIBE ');
    this.subscription.unsubscribe();
  }
  eliminar(idTransaccion: string) {
    const user = this.auth.getUser();
    return this.angularFirestore.collection('usuarios').doc(user.uid).collection('transacciones').doc(idTransaccion).delete();
  }
}
