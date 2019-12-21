import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth) { }

  registrarUsuario(data: { nombre: string, email: string, password: string }) {
    this.authFire.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(resp => {
        console.log(resp);
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
    console.log("cerrando sesion ...");
    this.authFire.auth.signOut();
  }

}
