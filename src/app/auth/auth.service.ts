import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from './user.modelo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$: Observable<firebase.User>;

  constructor(private authFire: AngularFireAuth) {
    this.currentUser$ = this.authFire.authState;
  }

  registrarUsuario(data: { nombre: string, email: string, password: string }) {
    this.authFire.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(resp => {
        const userAuth = resp.user;
        const usuario = new Usuario(data.nombre, userAuth.email, userAuth.uid);
        /*TODO REGISTRAR NOMBRE DE USUARIO,  */
      }).catch(error => {
        Swal.fire('Crear Cuenta', error.message, 'error');
        console.log(error);
      });
  }

  iniciarSesion(data: { email: string, password: string }) {
    this.authFire.auth.signInWithEmailAndPassword(data.email, data.password).then(resp => {
      console.log(resp);
    }).catch(error => {
      Swal.fire('Iniciar Sesion', error.message, 'error');
      console.log(error);
    });
  }

  cerrarSesion() {
    console.log('cerrando sesion ...');
    this.authFire.auth.signOut();
  }

  isAutenticado() {
    return this.currentUser$.pipe(
      map(user => user !== null));
  }

}
