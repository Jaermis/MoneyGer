import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../../../shared/moneyger-users.service';
import { Router } from '@angular/router';
import { MoneygerUsers } from '../../../../shared/moneyger-users.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {}
    
  isActive: boolean = false;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  userData: MoneygerUsers = new MoneygerUsers()
  
  ngOnInit(): void {
    this.service.loggedin_user().subscribe(
      {
        next:res=>{
            this.userData = res;
          },
        error:err=>{console.log(err)
        }
      }
    );
  }
}
