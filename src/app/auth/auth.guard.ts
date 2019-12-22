import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate() {
    return this.auth.isAutenticado().pipe(
      tap((isAuth: boolean) => {
        if (isAuth === false) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
