import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactService } from '../../../../shared/contact.service';
import { ContactRequest } from '../../../../interfaces/contact-request';
import { AuthResponse } from '../../../../interfaces/auth-response';
import { EditStatusRequest } from '../../../../interfaces/edit-status-request';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  
  constructor(
    private titleService: Title,
    private contactService: ContactService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  statuses: string[] = ['Latest', 'In Progress', 'Qualified', 'Unqualified', 'Forfeited', 'Deal'];

  contacts: ContactRequest[] = [];
  errors: ValidationError[] = [];
  checkedContacts: { [key: string]: boolean } = {};
  searchText = '';
  headerHovered: { [key: string]: boolean } = {};

  sortingOrders: { [key: string]: 'asc' | 'desc' } = {
    name: 'asc',
    company: 'asc',
    status: 'asc',
    email: 'asc',
    phoneNumber: 'asc',
    facebook: 'asc',
    twitter: 'asc',
    instagram: 'asc'
    
};

  ngOnInit(): void {
    this.titleService.setTitle('Moneyger Contacts');
    this.getContacts();
  }

  toggleSort(field: keyof ContactRequest) {
    const currentSortingOrder = this.sortingOrders[field];

    if(currentSortingOrder === 'asc') {
      this.contacts.sort((a,b) => b[field].localeCompare(a[field]));
      this.sortingOrders[field] = 'desc';
    }
    else {
      this.contacts.sort((a,b) => a[field].localeCompare(b[field]));
      this.sortingOrders[field] = 'asc';
    }
  }

  showSortingIndicator(field: keyof ContactRequest) {
    this.headerHovered[field] = true;
  }

  hideSortingIndicator(field: keyof ContactRequest) {
    this.headerHovered[field] = false;
  }

  isHeaderHovered(field: keyof ContactRequest) {
    return this.headerHovered[field];
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

  formatUrl(url: string): SafeResourceUrl {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContactComponent, { // Pass any data you want to the dialog component
    });

    dialogRef.componentInstance.contactAdded.subscribe(() => {
      this.getContacts(); // Refresh the contacts list when a new contact is added
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(EditContactComponent, { // Pass any data you want to the dialog component
    });

    //dialogRef.componentInstance.contactAdded.subscribe(() => {
      //this.getContacts();) // Refresh the contacts list when a new contact is added
    ;
  }
    
}
