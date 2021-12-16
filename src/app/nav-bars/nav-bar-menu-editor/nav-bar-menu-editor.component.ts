import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-menu-editor',
  templateUrl: './nav-bar-menu-editor.component.html'
})
export class NavBarMenuEditorComponent implements OnInit {

  constructor(private cookiesService: CookieService) { }

  ngOnInit(): void {
  }
  public cerrarSesion() {
    this.cookiesService.deleteAll();
  }
}
