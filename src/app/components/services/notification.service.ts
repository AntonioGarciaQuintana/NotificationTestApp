import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogHistory } from '../model/log-history.model';
import { NotificationRequest } from '../model/notification-request.model';
import { NotificationResponse } from '../model/notification-response.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly baseUrl = `${environment.apiUrl}/v1/notifications`;

  constructor(private http: HttpClient) {}

  sendNotification( notification : NotificationRequest): Observable<NotificationResponse>{
    return this.http.post<NotificationResponse>(this.baseUrl + '/send', notification);
  }
  getHistory(): Observable<LogHistory[]> {
    return this.http.get<LogHistory[]>(this.baseUrl);
  }

}
