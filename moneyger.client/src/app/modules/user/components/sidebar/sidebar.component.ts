import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCompanyDetail } from '../../../../interfaces/user-company-detail';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{
  userDetail! :Observable<UserCompanyDetail>;

  constructor(
    private titleService: Title, private router: Router,private common:CommonModule,
    public dialog: MatDialog
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

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
  }
}
