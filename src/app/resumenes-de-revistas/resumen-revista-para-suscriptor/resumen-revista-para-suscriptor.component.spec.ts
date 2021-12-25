import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRevistaParaSuscriptorComponent } from './resumen-revista-para-suscriptor.component';

describe('ResumenRevistaParaSuscriptorComponent', () => {
  let component: ResumenRevistaParaSuscriptorComponent;
  let fixture: ComponentFixture<ResumenRevistaParaSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenRevistaParaSuscriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenRevistaParaSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
