import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent }
];
