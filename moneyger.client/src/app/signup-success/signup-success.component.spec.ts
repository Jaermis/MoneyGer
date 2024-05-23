import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessComponent } from './signup-success.component';

describe('SignupSuccessComponent', () => {
  let component: SignupSuccessComponent;
  let fixture: ComponentFixture<SignupSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
