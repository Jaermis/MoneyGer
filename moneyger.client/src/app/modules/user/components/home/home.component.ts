import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../interfaces/validation-error';
import { ContactService } from '../../../../shared/contact.service';
import { ContactRequest } from '../../../../interfaces/contact-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private contactService: ContactService
  ) {}

  contacts: ContactRequest[] = [];
  errors: ValidationError[] = [];

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
}
