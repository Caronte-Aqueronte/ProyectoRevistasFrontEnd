import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-menu-lector',
  templateUrl: './nav-bar-menu-lector.component.html'
})
export class NavBarComponent implements OnInit {

  constructor(private cookiesService: CookieService) { }

  ngOnInit(): void {
  }
  public cerrarSesion() {
    this.cookiesService.deleteAll();
  }
}
