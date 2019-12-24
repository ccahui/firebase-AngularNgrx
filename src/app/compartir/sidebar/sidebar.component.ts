import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { selectFromAuthUsuario } from 'src/app/store/auth/auth.reducer';
import { cerrarSesion } from 'src/app/store/auth/auth.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {
    menus = [{
        titulo: 'Principal',
        icono: 'fa fa-dashboard',
        submenu: [{
            titulo: 'Ingresos/Egresos',
            url: '/ingreso-egreso'
        },
        {
            titulo: 'Estadistica',
            url: '/'
        }, {
            titulo: 'Detalle',
            url: '/detalles'
        },
        ]
    }];


    userInfo$: Observable<any>;
    constructor(private store: Store<AppState>, private auth: AuthService) { }

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(selectFromAuthUsuario));
    }

    cerrarSesion() {
        this.auth.cerrarSesion();
    }


}
