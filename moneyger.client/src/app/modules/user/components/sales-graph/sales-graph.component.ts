import { Component } from '@angular/core';
import { Category } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrl: './sales-graph.component.css'
})
export class SalesGraphComponent {
  
  //data sa line graph
  public data: Object[];
  public xAxis: Object;
  public yAxis: Object;
  public chartTitle: String;
  public legend: Object;
  public markerSettings: Object;
  public tooltipSettings: Object;

  constructor(){
    this.chartTitle = 'Sales Tracking';
    this.data = [
      {month: 'Jan', sales: 35}, {month: 'Feb', sales: 28},
      {month: 'Mar', sales: 34}, {month: 'Apr', sales: 32},
      {month: 'May', sales: 40}, {month: 'Jun', sales: 32},
      {month: 'Jul', sales: 35}, {month: 'Aug', sales: 55},
      {month: 'Sep', sales: 38}, {month: 'Oct', sales: 30},
      {month: 'Nov', sales: 25}, {month: 'Dec', sales: 32}
    ];
    this.tooltipSettings = {
      enable: true
    };
    this.markerSettings = {
      visible: true,
      dataLabel: {
        visible: true
      }
    };
    this.legend = {
      visible: true,
    };
    this.xAxis = {
      title: 'Month',
      valueType: 'Category'
    };
    this.yAxis = {
      title: 'Sales'
    }
  }

}
