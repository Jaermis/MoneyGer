import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCompanyDetail } from '../../../../interfaces/user-company-detail';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  userDetail!: Observable<UserCompanyDetail>;

  constructor(
    private titleService: Title,
    private router: Router,
    private common: CommonModule,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {}

  authService = inject(AuthService);
  isActive: boolean = false;

  ngOnInit(): void {
    this.loadUserDetails();

    // Subscribe to the profile refresh event
    this.sharedService.refreshProfile$.subscribe(() => {
      this.loadUserDetails();
    });
  }

  loadUserDetails() {
    this.userDetail = this.authService.getUserCompany();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
  }
}
 