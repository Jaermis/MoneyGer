import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactService } from '../../../../shared/contact.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditContact } from '../../../../interfaces/edit-contact';
import { CommonModule } from '@angular/common';


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
    private contactService: ContactService,
    private authService: AuthService, 
    public router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Add Contact');
  }

  Cancel(){
    this.router.navigate(['/user/contacts']);
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
