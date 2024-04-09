import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MoneygerUsersService } from '../../shared/moneyger-users.service';
import { Router } from '@angular/router';

const UserComponents = [
  MatButton,
  MatIconModule,
  MatSlideToggleModule,
  MatSidenavModule,
  FormsModule
]

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    GettingStartedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserComponents
  ],
  exports: [
    UserComponents
  ]
})
export class UserModule { 
  constructor(
    private titleService: Title, public service: MoneygerUsersService, private router: Router
    ) {}
    
    ngOnInit(): void {
      this.titleService.setTitle('User Dashboard');
      this.service.loggedin_user().subscribe(
        {
          next:res=>{
              console.log(res)
            },
          error:err=>{console.log(err)
          }
        }
      );
    }
}
