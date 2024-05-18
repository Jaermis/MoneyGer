import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyGraphComponent } from './frequency-graph.component';

describe('FrequencyGraphComponent', () => {
  let component: FrequencyGraphComponent;
  let fixture: ComponentFixture<FrequencyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequencyGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrequencyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
