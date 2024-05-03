import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../../../shared/moneyger-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Create a Company');
     // this.service.refreshlist();
    }

    CreateCompany(){
      this.router.navigate(['/user']);
    }

    Cancel(){
      this.router.navigate(['/user/getting-started']);
    }
}
