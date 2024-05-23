import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteSuccessComponent } from './invite-success.component';

describe('InviteSuccessComponent', () => {
  let component: InviteSuccessComponent;
  let fixture: ComponentFixture<InviteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InviteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
