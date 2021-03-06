import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { selectFromIULoading } from 'src/app/store/iu/iu.reducer';
declare function init_plugins();

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistrarseComponent implements OnInit {

  static lenghtMinPassword = 6;

  registrarseForm;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private auth: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    init_plugins();
    this.crearFormulario();
    this.inicializarConDatosFormulario();
    this.loading$ = this.store.pipe(select(selectFromIULoading));
  }
  crearFormulario() {
    this.registrarseForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(RegistrarseComponent.lenghtMinPassword)]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(RegistrarseComponent.lenghtMinPassword)]],
      terminos: ['', Validators.pattern('true')],
    }, { validator: this.confirmPasswordValidator });
  }
  confirmPasswordValidator(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmarPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmarPassword').setErrors({ confirmPassword: true });
    } else {
      control.get('confirmarPassword').setErrors(null);
      return null;
    }
  }


  inicializarConDatosFormulario() {
    const data = {
      nombres: 'Kristian',
      email: 'kccahui@unsa.edu.pe',
      password: '123456',
      confirmarPassword: '123456',
      terminos: true
    };
    this.registrarseForm.setValue(data);
  }

  registrarse() {
    this.auth.registrarUsuario(this.registrarseForm.value);
  }

}
