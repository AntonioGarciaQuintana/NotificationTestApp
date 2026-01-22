import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LogHistory } from '../../model/log-history.model';
import { NotificationService } from '../../services/notification.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatTableModule,
    MatSnackBarModule,
  ],
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css']
})
export class LogHistoryComponent implements OnInit {
  logs: Array<LogHistory> = [];
  displayedColumns = ['User','Email','Notification type', 'Category', 'Message', 'Date','Delivered'];

  notificationService = inject(NotificationService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(){
    this.notificationService.getHistory()
    .subscribe(
      (result) => {
      this.logs = result;
    },
    (err) => {
      const apiError = err.error;

          this.printMessage(apiError.message, false);
    })
  }

   private printMessage(message: string, isSuccess: boolean) {
    this.snackBar.open(message, isSuccess ? 'OK' : 'ERROR', {
      duration: 3000,
    });
  }

}
