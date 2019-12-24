import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { cerrarSesion } from 'src/app/store/auth/auth.actions';
import { selectFromAuthUsuario } from 'src/app/store/auth/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userInfo$: Observable<any>;
  constructor(private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit() {
      this.userInfo$ = this.store.pipe(select(selectFromAuthUsuario));
  }

  cerrarSesion() {
      this.auth.cerrarSesion();
  }



}
