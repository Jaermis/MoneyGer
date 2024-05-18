import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactService } from '../../../../shared/contact.service';
import { ContactRequest } from '../../../../interfaces/contact-request';
import { AuthResponse } from '../../../../interfaces/auth-response';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private contactService: ContactService
  ) {}

  contacts: ContactRequest[] = [];
  errors: ValidationError[] = [];
  checkedContacts: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.titleService.setTitle('Moneyger Contacts');
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (response: ContactRequest[]) => {
        this.contacts = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
        console.error(err.message);
      },
    });
  }
  
  deleteSelectedContacts(): void {
    const contactsToDelete = Object.keys(this.checkedContacts).filter(contactId => this.checkedContacts[contactId]);

    if (contactsToDelete.length > 0) {
      this.contactService.deleteContacts(contactsToDelete).subscribe({
        next: (response: AuthResponse) => {
          if (response.isSuccess) {
            this.contacts = this.contacts.filter(contact => !contactsToDelete.includes(contact.id));
            this.checkedContacts = {};  // Reset the checked contacts
          } else {
            console.error('Error deleting contacts:', response.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting contacts:', err.message);
        },
        
      complete:()=>this.ngOnInit(),
      });
    }
  }

  onCheckboxChange(contactId: string, event: any): void {
    this.checkedContacts[contactId] = event.target.checked;
  }

  isAnyCheckboxChecked(): boolean {
    return Object.values(this.checkedContacts).some(isChecked => isChecked);
  }
}
