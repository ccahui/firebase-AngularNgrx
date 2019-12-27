import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppState } from '../../store/app.reducers';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../../auth/user.modelo';
import { Store, select } from '@ngrx/store';
import { selectFromAuthUsuario } from '../../store/auth/auth.reducer';
import { filter } from 'rxjs/operators';
import { selectFromIULoading } from '../../store/iu/iu.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit, OnDestroy {
  perfilForm: FormGroup;
  userInfo: Usuario = new Usuario('', '', '');
  subscripcion: Subscription;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit() {
    this.crearFormulario();

    this.subscripcion = this.store.pipe(
      select(selectFromAuthUsuario),
      filter(user => user != null))
      .subscribe((user) => {
        this.userInfo = user;
        this.actualizarFormulario(user);
      });
    this.loading$ = this.store.pipe(select(selectFromIULoading));
  }

  private actualizarFormulario(user: Usuario) {
    const data = {
      nombres: user.nombres,
      email: user.email,
    };
    this.perfilForm.setValue(data);
  }

  actualizarPerfil() {
    console.log('Actualizar ...');
    const data = {
      ...this.perfilForm.value,
      uid: this.userInfo.uid,
    };
    this.auth.actualizarPerfil(data);
  }
  crearFormulario() {
    this.perfilForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

}
