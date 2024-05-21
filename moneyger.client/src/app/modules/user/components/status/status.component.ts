import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../../../shared/contact.service';
import { Title } from '@angular/platform-browser';
import { EditStatusRequest } from '../../../../interfaces/edit-status-request';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactRequest } from '../../../../interfaces/contact-request';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() contactId!: string;
  @Input() contactName!: string;
  @Input() contactStatus!: string;

  passContact! :ContactsComponent;

  editStatus: EditStatusRequest = {
    id:'',
    name: '',
    status: 1
  };
  
  constructor(
    private titleService: Title,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    if (this.contactStatus) {
      // Find the option that matches the contactStatus value
      const matchedOption = this.options.find(option => option.value === this.contactStatus);
      this.selectedOption = matchedOption || this.options[0];
    } 
    else {
      this.selectedOption = this.options[0];
    }
  }

  selectedOption: any;
  contacts: ContactRequest[] = [];
  errors: ValidationError[] = [];

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

  selectOption(option: any, index: number, event: Event) {
    this.selectedOption = option;
    // You can use the index here for further processing
    this.editStatus.id = this.contactId;
    this.editStatus.status = index+1;
    this.optionsVisible = false;
    event.stopPropagation();
    this.updateStatus();
  }
  
  updateStatus(): void {
    this.contactService.updateStatus(this.editStatus).subscribe({
      next: (response) => {
        this.passContact.getContacts()
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message, err.headers);
      },
    });
  }
}
