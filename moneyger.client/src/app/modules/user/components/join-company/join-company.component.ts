import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../../../shared/moneyger-users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-join-company',
  templateUrl: './join-company.component.html',
  styleUrl: './join-company.component.css'
})
export class JoinCompanyComponent {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {}

    ngOnInit(): void {
      this.titleService.setTitle('Join a Company');
     // this.service.refreshlist();
    }

    Cancel(){
      this.router.navigate(['user/getting-started']);
    }

    JoinCompany(){
      this.router.navigate(['/user']);
    }
}
