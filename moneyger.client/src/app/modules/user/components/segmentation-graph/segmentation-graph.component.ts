import { Component } from '@angular/core';
import { inside } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-segmentation-graph',
  templateUrl: './segmentation-graph.component.html',
  styleUrl: './segmentation-graph.component.css'
})
export class SegmentationGraphComponent {
    public data: Object[];
    public chartTitle: string;
    public chartLabel: Object;
    public legend: Object;
    public tooltipSettings: Object;

    constructor() {
      this.chartTitle = 'Customer Purchase Segmentation';
      this.data = [
        {name: 'Combo 1', value: '5', text: '5%'},
        {name: 'Combo 2', value: '10', text: '10%'},
        {name: 'Combo 3', value: '15', text: '15%'},
        {name: 'Combo 4', value: '20', text: '20%'},
        {name: 'Combo 5', value: '8', text: '8%'},
        {name: 'Combo 6', value: '12', text: '12%'},
        {name: 'Combo 7', value: '30', text: '30%'},
      ];
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
}
