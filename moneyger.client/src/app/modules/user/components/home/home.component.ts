import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../../../shared/moneyger-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {}

ngOnInit(): void {
      this.titleService.setTitle('Moneyger Dashboard');
     // this.service.refreshlist();

    }
}
