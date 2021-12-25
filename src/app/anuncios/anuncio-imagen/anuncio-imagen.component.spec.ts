import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioImagenComponent } from './anuncio-imagen.component';

describe('AnuncioImagenComponent', () => {
  let component: AnuncioImagenComponent;
  let fixture: ComponentFixture<AnuncioImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
