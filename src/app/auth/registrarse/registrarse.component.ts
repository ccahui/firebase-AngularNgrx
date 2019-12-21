import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistrarseComponent implements OnInit {

  static lenghtMinPassword = 1;

  registrarseForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    init_plugins();
    this.crearFormulario();
    this.inicializarConDatosFormulario();
  }
  crearFormulario() {
    this.registrarseForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(RegistrarseComponent.lenghtMinPassword)]],
      confirmarPassword: ['', [Validators.required, Validators.min(RegistrarseComponent.lenghtMinPassword)]],
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
    console.log(this.registrarseForm.status);
    console.log(this.registrarseForm.value);

  }

}
