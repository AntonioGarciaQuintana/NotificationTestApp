import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout.component';
import { NotificationComponent } from './components/features/notification/notification.component';
import { LogHistoryComponent } from './components/features/logHistory/log-history.component';

export const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'submit', component: NotificationComponent },
      { path: 'history', component: LogHistoryComponent },
      { path: '', redirectTo: 'submit', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
