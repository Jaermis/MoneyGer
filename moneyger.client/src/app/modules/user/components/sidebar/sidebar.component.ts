import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCompanyDetail } from '../../../../interfaces/user-company-detail';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{
  userDetail! :Observable<UserCompanyDetail>;

  constructor(
    private titleService: Title, private router: Router,private common:CommonModule
  ) {}

  ngOnInit(): void {
    this.userDetail = this.authService.getUserCompany();
  }

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
