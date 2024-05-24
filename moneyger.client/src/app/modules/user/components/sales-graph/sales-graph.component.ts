import { Component, Inject, OnInit } from '@angular/core';
import { SalesService } from '../../../../shared/sales.service';
import { SalesRequest } from '../../../../interfaces/sales-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css'] // Corrected property name
})
export class SalesGraphComponent implements OnInit {

  sales: SalesRequest[] = [];
  errors: ValidationErrors[] = [];

  // Data for the line graph
  public data: Object[];
  public data2: Object[];
  public data3: Object[];
  public xAxis: Object;
  public yAxis: Object;
  public chartTitle: String;
  public legend: Object;
  public markerSettings: Object;
  public tooltipSettings: Object;
  public margin: Object;

  constructor(private salesService: SalesService) {
    this.chartTitle = 'Sales Tracking';
    this.data = []; // Sales
    this.data2 = []; // Expenses
    this.data3 = []; //Profit

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
      title: 'Date',
      valueType: 'Category',
      position: 'Auto'
    };
    this.yAxis = {
      title: 'Amount'
    };
    this.margin = {
      left: 40, right: 40, top: 40, bottom: 40
    };
  }

  ngOnInit(): void {
    this.getSales();
  }

  exportSales():void{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sales);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sales');
    const fileName = "Sales "+new Date().toLocaleDateString+".xlsx";
    XLSX.writeFile(wb,fileName);
  }

  getSales(): void {
    this.salesService.getSales().subscribe({
      next: (response: SalesRequest[]) => {
        this.sales = response;
        this.processSalesData();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }

  processSalesData(): void {
    const salesData = this.sales
        .map(item => ({ date: item.date, revenue: item.revenue }))
        .sort((a, b) => this.compareDates(a.date, b.date));
    
    const expensesData = this.sales
        .map(item => ({ date: item.date, expenses: item.expenses }))
        .sort((a, b) => this.compareDates(a.date, b.date));
    
    const profitData = this.sales
    .map(item => ({ date: item.date, profit: item.profit }))
    .sort((a, b) => this.compareDates(a.date, b.date));
    
    this.data = salesData;
    this.data2 = expensesData;
    this.data3 = profitData;
  }

  compareDates(date1: string, date2: string): number {
      const [month1, year1] = date1.split('/').map(Number);
      const [month2, year2] = date2.split('/').map(Number);

      if (year1 !== year2) {
          return year1 - year2;
      }
      return month1 - month2;
  }
}