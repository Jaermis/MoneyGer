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

  toHome(){
    this.router.navigate(['/user/home']);
  }
  toLists(){
    this.router.navigate(['/user/lists']);
  }
  toContacts(){
    this.router.navigate(['/user/contacts']);
  }
  toOrders(){
    this.router.navigate(['/user/orders']);
  }
  toStatistics(){
    this.router.navigate(['/user/statistics']);
  }
  toCalendar(){
    this.router.navigate(['/user/calendar']);
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
