import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAdministrativoComponent } from './nav-bar-administrativo.component';

describe('NavBarAdministrativoComponent', () => {
  let component: NavBarAdministrativoComponent;
  let fixture: ComponentFixture<NavBarAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarAdministrativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
