import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagarSuscripcionComponent } from './form-pagar-suscripcion.component';

describe('FormPagarSuscripcionComponent', () => {
  let component: FormPagarSuscripcionComponent;
  let fixture: ComponentFixture<FormPagarSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPagarSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPagarSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
