import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationGraphComponent } from './segmentation-graph.component';

describe('SegmentationGraphComponent', () => {
  let component: SegmentationGraphComponent;
  let fixture: ComponentFixture<SegmentationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegmentationGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
