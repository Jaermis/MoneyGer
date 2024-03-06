import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'getting-started', component: GettingStartedComponent},
      {path: 'home', component: HomeComponent},
      {path: '', component: HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
