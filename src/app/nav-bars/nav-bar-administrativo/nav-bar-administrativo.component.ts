import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-administrativo',
  templateUrl: './nav-bar-administrativo.component.html',
  styleUrls: ['./nav-bar-administrativo.component.css']
})
export class NavBarAdministrativoComponent implements OnInit {

  constructor(private cookiesService: CookieService) { }

  ngOnInit(): void {
  }
  public cerrarSesion() {
    this.cookiesService.deleteAll();
  }
}
