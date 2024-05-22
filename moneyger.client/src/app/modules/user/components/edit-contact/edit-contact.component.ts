  import { Component, Inject, Input, OnInit } from '@angular/core';
  import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router, RouterLink } from '@angular/router';
  import { ValidationError } from '../../../../interfaces/validation-error';
  import { ContactService } from '../../../../shared/contact.service';
  import { Title } from '@angular/platform-browser';
  import { AuthService } from '../../../../shared/auth.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { EditContact } from '../../../../interfaces/edit-contact';
  import { CommonModule } from '@angular/common';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { ContactRequest } from '../../../../interfaces/contact-request';


  @Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrl: './edit-contact.component.css',
    standalone: true,
    imports:[FormsModule, RouterLink,ReactiveFormsModule,CommonModule]
  })

  export class EditContactComponent implements OnInit {
    firstName: string = '';
    lastName: string = '';
    editProfileForm!: FormGroup;
    @Input() send!: EditContact;
    
    newContact: EditContact = {
      id: '',
      phoneNumber: '',
      email: ' ',
      facebook:' ',
      twitter: ' ',
      instagram: '',
      companyName: ''
    };
    errors: ValidationError[] = [];

    constructor(
      private titleService: Title,
      private fb: FormBuilder,
      private contactService: ContactService,
      private authService: AuthService, 
      public router: Router,
      public dialogRef: MatDialogRef<EditContactComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { contact: ContactRequest }
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Add Contact');
      const [firstName, lastName] = this.splitFullName(this.data.contact.name);
      this.editProfileForm = this.fb.group({
        firstName: [firstName],
        lastName: [lastName],
        phoneNumber: [this.data.contact.phoneNumber],
        email: [this.data.contact.email],
        facebook: [this.data.contact.facebook],
        twitter: [this.data.contact.twitter],
        instagram: [this.data.contact.instagram],
        companyName: [this.data.contact.companyName, Validators.required]
      });
    }

    private splitFullName(fullName: string): [string, string] {
      const names = fullName.split(' ');
      const firstName = names.slice(0, -1).join(' ');
      const lastName = names.slice(-1).join(' ');
      return [firstName, lastName];
    }

    Cancel(){
      this.dialogRef.close();
    }
    
    editContact(): void {
      const editContactRequest: EditContact = {
        id: this.newContact.id,
        companyName: this.newContact.companyName,
        phoneNumber: this.newContact.phoneNumber,
        email: this.newContact.email,
        facebook: this.newContact.facebook,
        twitter: this.newContact.twitter,
        instagram: this.newContact.instagram
      };
      
      this.contactService.editContacts(editContactRequest).subscribe(
        (response) => {
          console.log('Contact updated successfully:', response);
          // Perform any additional actions after successful update
        },
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.errors = err.error;
          }
          console.error(err.message, err.headers);
        }
      );
    }
  }
