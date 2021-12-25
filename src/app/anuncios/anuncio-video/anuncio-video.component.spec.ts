import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioVideoComponent } from './anuncio-video.component';

describe('AnuncioVideoComponent', () => {
  let component: AnuncioVideoComponent;
  let fixture: ComponentFixture<AnuncioVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});