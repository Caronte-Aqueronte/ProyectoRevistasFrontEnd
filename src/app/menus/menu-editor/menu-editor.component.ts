import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-editor',
  templateUrl: './menu-editor.component.html'
})
export class MenuEditorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }

}
