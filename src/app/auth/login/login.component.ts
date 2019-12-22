import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
/*Funcionalidades y eventos internos */



declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static lenghtMinPassword = 6  ;

  loginForm;

  constructor(private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    init_plugins();
    this.crearFormulario();
    this.inicializarConDatosFormulario();
  }
  crearFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(LoginComponent.lenghtMinPassword)]],
      recordarme: ['']
    });
  }


  inicializarConDatosFormulario() {
    const data = {
      email: 'kccahui@unsa.edu.pe',
      password: '123456',
      recordarme: true
    };
    this.loginForm.setValue(data);
  }

  iniciarSesion() {
    this.auth.iniciarSesion(this.loginForm.value);
  }

}
