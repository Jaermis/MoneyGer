import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCompanyComponent } from './join-company.component';

describe('JoinCompanyComponent', () => {
  let component: JoinCompanyComponent;
  let fixture: ComponentFixture<JoinCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
