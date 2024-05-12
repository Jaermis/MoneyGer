import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserModule } from './modules/user/user.module';
import { DashboardComponent } from './modules/user/components/dashboard/dashboard.component';
import { GettingStartedComponent } from './modules/user/components/getting-started/getting-started.component';
import { HeaderComponent } from './modules/user/components/header/header.component';
import { HomeComponent } from './modules/user/components/home/home.component';
import { SidebarComponent } from './modules/user/components/sidebar/sidebar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpass', component: ForgotpassComponent},
  { path: 'user', loadChildren:()=> import('./modules/user/user.module').then((m)=>m.UserModule)}, //lazyload dashboard
  { path: 'home', loadChildren:()=> import('./modules/home/home.module').then((m)=>m.HomeModule)}, //lazyload landing-page
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
