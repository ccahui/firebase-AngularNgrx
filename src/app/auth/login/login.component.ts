import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { selectFromIULoading } from 'src/app/store/iu/iu.reducer';
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
  loading$: Observable<boolean>;
  constructor(private fb: FormBuilder, public auth: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    init_plugins();
    this.crearFormulario();
    this.inicializarConDatosFormulario();
    this.loading$  = this.store.pipe(select(selectFromIULoading));
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
      email: 'hannagover@unsa.edu.pe',
      password: '123456',
      recordarme: true
    };
    this.loginForm.setValue(data);
  }

  iniciarSesion() {
    this.auth.iniciarSesion(this.loginForm.value);
  }

}
