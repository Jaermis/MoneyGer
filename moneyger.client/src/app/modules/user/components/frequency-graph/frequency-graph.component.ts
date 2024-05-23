import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../../shared/sales.service';
import { SalesRequest } from '../../../../interfaces/sales-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-frequency-graph',
  templateUrl: './frequency-graph.component.html',
  styleUrl: './frequency-graph.component.css'
})
export class FrequencyGraphComponent implements OnInit{
  public data: Object[];
  public xAxis: Object;
  public yAxis: Object;
  public chartTitle: string;
  public markerSettings: Object;
  public tooltipSettings: Object;

  constructor(private salesService: SalesService) {
    this.chartTitle = 'Monthly Sales Distribution';
    this.data = [];    
    this.xAxis = {
      valueType: 'Category',
      labelPlacement: 'OnTicks'
    };
    this.yAxis = {
      minimum: 0,
      interval: 5
    };
    this.markerSettings = {
      visible: true,
      height: 7,
      width: 7
    };
    this.tooltipSettings = {
      enable: true
    }
  }

  ngOnInit(): void {
    this.getSales();
  }

  sales: SalesRequest[] = [];
  errors: ValidationErrors[] = [];

  getSales(): void {
    this.salesService.getSales().subscribe({
      next: (response: SalesRequest[]) => {
        this.sales = response;
        this.data = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }
}
