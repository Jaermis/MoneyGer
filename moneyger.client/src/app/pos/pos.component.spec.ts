import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosComponent } from './pos.component';

describe('PosComponent', () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
