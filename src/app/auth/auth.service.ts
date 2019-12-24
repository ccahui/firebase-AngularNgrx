import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from './user.modelo';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { activarLoading, desactivarLoading } from '../store/iu/iu.actions';
import { loginSuccess, cerrarSesion } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$: Observable<firebase.User>;
  subscription: Subscription;
  private usuarioCollection: AngularFirestoreCollection<any>;
  constructor(
    private authFire: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router, private store: Store<AppState>) {

    this.currentUser$ = this.authFire.authState;
    this.currentUser$.subscribe(user => {
      if (user) {
        this.subscription = this.angularFirestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((userDoc: any) => {
          const usuario = new Usuario(userDoc.nombres, userDoc.email, user.uid);
          this.store.dispatch(loginSuccess({ usuario }));
        });
      } else {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
    });

    this.usuarioCollection = angularFirestore.collection<any>('usuarios');
  }

  registrarUsuario(data: { nombres: string, email: string, password: string }) {

    this.store.dispatch(activarLoading());

    this.authFire.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(resp => {
        const userAuth = resp.user;
        const usuario = new Usuario(data.nombres, userAuth.email, userAuth.uid);
        /*TODO REGISTRAR NOMBRE DE USUARIO,  */
        this.addUsuario(userAuth.uid, { nombres: data.nombres, email: userAuth.email });

      }).catch(error => {
        this.store.dispatch(desactivarLoading());
        Swal.fire('Crear Cuenta', error.message, 'error');
        console.log(error);
      });
  }

  private addUsuario(id: string, data: { nombres: string, email: string }) {
    this.usuarioCollection.doc(id).set(data)
      .then(() => {
        this.store.dispatch(desactivarLoading());
      })
      .catch((error) => {
        Swal.fire('Error writing document: ', error);
        this.store.dispatch(desactivarLoading());
      });
  }

  iniciarSesion(data: { email: string, password: string }) {

    this.store.dispatch(activarLoading());
    this.authFire.auth.signInWithEmailAndPassword(data.email, data.password).
      then(resp => {
        const user = resp.user;
        const usuario = new Usuario(user.email, user.email, user.uid);
        this.store.dispatch(desactivarLoading());
        this.store.dispatch(loginSuccess({ usuario }));
        this.router.navigate(['']);
      }).catch(error => {
        Swal.fire('Iniciar Sesion', error.message, 'error');
        this.store.dispatch(desactivarLoading());
        console.log(error);
      });
  }

  cerrarSesion() {
    this.authFire.auth.signOut().
      then(() => {
        this.store.dispatch(cerrarSesion());
        this.router.navigate(['/login']);
      })
      .catch(error => {
        Swal.fire('Iniciar Sesion', error.message, 'error');
      });
  }

  isAutenticado() {
    return this.currentUser$.pipe(
      map(user => user !== null));
  }

}
