import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrl: './sales-graph.component.css'
})
export class SalesGraphComponent {
  
  //data sa line graph
  public data: Object[];
  public data2: Object[];
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
    this.data2 = [
      {month: 'Jan', expense: 43}, {month: 'Feb', expense: 42},
      {month: 'Mar', expense: 11}, {month: 'Apr', expense: 57},
      {month: 'May', expense: 98}, {month: 'Jun', expense: 16},
      {month: 'Jul', expense: 63}, {month: 'Aug', expense: 14},
      {month: 'Sep', expense: 23}, {month: 'Oct', expense: 67},
      {month: 'Nov', expense: 67}, {month: 'Dec', expense: 24}
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
      position: 'Auto'
    };
    this.xAxis = {
      title: 'Month',
      valueType: 'Category',
      position: 'Auto'
    };
    this.yAxis = {
      title: 'Sales'
    }
  }

}
