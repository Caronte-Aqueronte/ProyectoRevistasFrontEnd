import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnuncioTextoFormComponent } from './crear-anuncio-texto-form.component';

describe('CrearAnuncioTextoFormComponent', () => {
  let component: CrearAnuncioTextoFormComponent;
  let fixture: ComponentFixture<CrearAnuncioTextoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAnuncioTextoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnuncioTextoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
