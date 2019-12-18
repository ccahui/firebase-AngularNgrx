import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Error404Component } from './error404/error404.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [SidebarComponent, Error404Component, HeaderComponent, BreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports: [
        Error404Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
  ]
})
export class CompartirModule { }
