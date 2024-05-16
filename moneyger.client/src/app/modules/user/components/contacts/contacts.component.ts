import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  constructor(
    private titleService: Title, private router: Router
    ) {}

ngOnInit(): void {
      this.titleService.setTitle('Moneyger Contacts');
      //this.service.refreshlist();

    }
}
