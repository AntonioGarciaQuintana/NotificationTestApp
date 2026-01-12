import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LogHistory } from '../../model/log-history.model';
import { NotificationService } from '../../services/notification.service';

interface LogItem {
  date: Date;
  category: string;
  message: string;
}

@Component({
  standalone: true,
  selector: 'app-log-history',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css']
})
export class LogHistoryComponent implements OnInit {
  logs: Array<LogHistory> = [];
  displayedColumns = ['User','Email','Notification type', 'Category', 'Message', 'Date','Delivered'];

  notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(){
    this.notificationService.getHistory().subscribe(result => {
      this.logs = result;
    })
  }

}
