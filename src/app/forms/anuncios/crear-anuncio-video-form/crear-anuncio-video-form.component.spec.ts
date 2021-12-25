import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnuncioVideoFormComponent } from './crear-anuncio-video-form.component';

describe('CrearAnuncioVideoFormComponent', () => {
  let component: CrearAnuncioVideoFormComponent;
  let fixture: ComponentFixture<CrearAnuncioVideoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAnuncioVideoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnuncioVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
