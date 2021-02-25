import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutContactComponent } from './ajout-contact.component';

describe('AjoutContactComponent', () => {
  let component: AjoutContactComponent;
  let fixture: ComponentFixture<AjoutContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
