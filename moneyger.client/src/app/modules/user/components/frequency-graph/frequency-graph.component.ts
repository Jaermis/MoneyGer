import { Component } from '@angular/core';

@Component({
  selector: 'app-frequency-graph',
  templateUrl: './frequency-graph.component.html',
  styleUrl: './frequency-graph.component.css'
})
export class FrequencyGraphComponent {
  public data: Object[];
  public xAxis: Object;
  public yAxis: Object;
  public chartTitle: string;
  public markerSettings: Object;
  public tooltipSettings: Object;

  constructor() {
    this.chartTitle = 'Monthly Sales Distribution';
    this.data = [
      {month: 'Jan', sales: 90}, {month: 'Feb', sales: 90},
      {month: 'Mar', sales: 91}, {month: 'Apr', sales: 91},
      {month: 'May', sales: 91}, {month: 'Jun', sales: 91},
      {month: 'Jul', sales: 90}, {month: 'Aug', sales: 90},
      {month: 'Sep', sales: 91}, {month: 'Oct', sales: 91},
      {month: 'Nov', sales: 91}, {month: 'Dec', sales: 91}
    ];    
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
}
