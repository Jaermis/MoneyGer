import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { HomeComponent } from './components/home/home.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ListsComponent } from './components/lists/lists.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { JoinCompanyComponent } from './components/join-company/join-company.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'getting-started', component: GettingStartedComponent},
      {path: 'home', component: HomeComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: '', component: HomeComponent},
      {path: 'create-company', component: CreateCompanyComponent},
      {path: 'join-company', component: JoinCompanyComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
