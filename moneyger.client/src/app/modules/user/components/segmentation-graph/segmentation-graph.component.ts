import { Component, OnInit } from '@angular/core';
import { SegmentationService } from '../../../../shared/segmentation.service';
import { SegmentationRequest } from '../../../../interfaces/segmentation-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';

@Component({
  selector: 'app-segmentation-graph',
  templateUrl: './segmentation-graph.component.html',
  styleUrl: './segmentation-graph.component.css'
})
export class SegmentationGraphComponent implements OnInit {
    public data: Object[];
    public chartTitle: string;
    public chartLabel: Object;
    public legend: Object;
    public tooltipSettings: Object;

    constructor(private segmentationService:SegmentationService) {
      this.chartTitle = 'Customer Purchase Segmentation';
      this.data = [];
      this.tooltipSettings = {
        enable: true,
        format: '${point.x} : <b>${point.y}%</b>'
      }
      this.chartLabel = {
        visible: true,
        position: 'Outside',
        name: 'text'
      };
      this.legend = {
        visible: true,
        position: 'Right',
        alignment: 'Far', 
        height: '69%',
        width: '20%'
      };
    }
  
  errors: ValidationError[] = [];

  ngOnInit(): void {
    this.getSegmentation();
  }

    getSegmentation(): void {
      this.segmentationService.getSegmentation().subscribe({
        next: (response: SegmentationRequest[]) => {
          this.data = response;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.errors = err.error;
          }
        },
      });
    }
}
