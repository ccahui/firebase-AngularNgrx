import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Error404Component } from './error404/error404.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [SidebarComponent, Error404Component, HeaderComponent, BreadcrumbComponent, BarChartComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
        Error404Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        BarChartComponent
  ]
})
export class CompartirModule { }
