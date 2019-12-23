import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

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
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.userInfo$ = this.auth.currentUser$;
    }
    cerrarSesion() {
        this.auth.cerrarSesion();
    }

}
