import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  selectedOption: any;

  options = [
    {name: 'option-1', value: 'Latest'},
    {name: 'option-2', value: 'In Progress'},
    {name: 'option-3', value: 'Qualified'},
    {name: 'option-4', value: 'Unqualified'},
    {name: 'option-5', value: 'Forfeited'},
    {name: 'option-6', value: 'Deal'},
  ];

  optionsVisible = false;

  toggleOption() {
    this.optionsVisible = !this.optionsVisible;
  }

  selectOption(option: any, event: Event) {
    this.selectedOption = option;
    this.optionsVisible = false;
    event.stopPropagation();
  }
  
}
