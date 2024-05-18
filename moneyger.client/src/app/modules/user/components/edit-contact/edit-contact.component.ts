import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NewContactRequest } from '../../../../interfaces/new-contact-request';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactService } from '../../../../shared/contact.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css',
  standalone: true,
  imports:[FormsModule, RouterLink]
})

export class EditContactComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  newContact: NewContactRequest = {
    name: '',
    phoneNumber: '',
    email: ' ',
    facebook:' ',
    twitter: ' ',
    instagram: '',
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

  updateFullName() {
    this.newContact.name = `${this.firstName} ${this.lastName}`;
  }

  addContact(){
    this.contactService.addContact(this.newContact).subscribe({
      next:(response)=>{
          this.router.navigate(['/user/contacts']);
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err.message);
      },
      complete:()=>alert('Added contact successfully'),
    });
  }
}
