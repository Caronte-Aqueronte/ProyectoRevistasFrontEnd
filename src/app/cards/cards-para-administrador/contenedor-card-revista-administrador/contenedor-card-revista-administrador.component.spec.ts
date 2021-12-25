import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorCardRevistaAdministradorComponent } from './contenedor-card-revista-administrador.component';

describe('ContenedorCardRevistaAdministradorComponent', () => {
  let component: ContenedorCardRevistaAdministradorComponent;
  let fixture: ComponentFixture<ContenedorCardRevistaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorCardRevistaAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorCardRevistaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
