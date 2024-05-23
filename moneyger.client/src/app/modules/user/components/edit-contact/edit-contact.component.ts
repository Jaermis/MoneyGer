  import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
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
    @Output() editCurrentContact = new EventEmitter<void>();
    
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
    
    editContact() {
      const updatedContact: EditContact = {
        id: this.data.contact.id,
        phoneNumber: this.editProfileForm.get('phoneNumber')?.value,
        email: this.editProfileForm.get('email')?.value,
        facebook: this.editProfileForm.get('facebook')?.value,
        twitter: this.editProfileForm.get('twitter')?.value,
        instagram: this.editProfileForm.get('instagram')?.value,
        companyName: this.editProfileForm.get('companyName')?.value
      };
    
      this.contactService.editContacts(updatedContact).subscribe({
        next: (response) => {
          this.router.navigate(['/user/contacts']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        },
        complete: () => {
          this.dialogRef.close();
          this.editCurrentContact.emit();
        }
      });
    }
  }
