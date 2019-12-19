import { Component, OnInit } from '@angular/core';

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
            url: '/'
        },
        {
            titulo: 'Estadistica',
            url: '/estadistica'
        }, {
            titulo: 'Detalle',
            url: '/detalle'
        },
        ]
    }];

    constructor() { }

    ngOnInit() {
    }

}
