import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../../../shared/moneyger-users.service';
import { Router } from '@angular/router';
import { MoneygerUsers } from '../../../../shared/moneyger-users.model';
import { AuthService } from '../../../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router, private common:CommonModule
    ) {}
  
  authService = inject(AuthService);
  isActive: boolean = false;
  
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout=()=>{
    this.authService.logout();
    this.router.navigate(['/login']);
  };

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
}
