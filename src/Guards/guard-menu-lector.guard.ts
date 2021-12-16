import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GuardMenuLectorGuard implements CanActivate {
  constructor(private cookiesService: CookieService, private router: Router) {

  }
  private redireccionar(bandera: boolean): any {
    if (!bandera) {
      this.router.navigate(['/', 'login']);
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookiesService.get("Rol");
    const saberSiEsDelRol = cookie.includes("Lector");
    this.redireccionar(saberSiEsDelRol);
    return true;
  }

}
