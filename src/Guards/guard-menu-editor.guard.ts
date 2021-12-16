import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardMenuEditorGuard implements CanActivate {
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
      const saberSiEsDelRol = cookie.includes("Editor");
      this.redireccionar(saberSiEsDelRol);
      return true;
  }
  
}
