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
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { SalesGraphComponent } from './components/sales-graph/sales-graph.component';
import { SegmentationGraphComponent } from './components/segmentation-graph/segmentation-graph.component';
import { FrequencyGraphComponent } from './components/frequency-graph/frequency-graph.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { StatusComponent } from './components/status/status.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SettingsComponent } from './components/settings/settings.component';


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
      {path: 'join-company', component: JoinCompanyComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'edit-profile', component: EditProfileComponent},
      {path: 'add-contact', component: AddContactComponent},
      {path: 'sales-graph', component: SalesGraphComponent},
      {path: 'segmentation-graph', component: SegmentationGraphComponent},
      {path: 'frequency-graph', component: FrequencyGraphComponent},
      {path: 'edit-contact', component: EditContactComponent},
      {path: 'status', component: StatusComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'inventory', component: InventoryComponent},
      {path: 'settings', component: SettingsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class UserRoutingModule { }
