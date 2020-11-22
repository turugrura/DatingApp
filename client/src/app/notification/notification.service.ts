import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

interface Message {
  type: 'success' | 'info' | 'warn' | 'error';
  header: string;
  detail: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageSource = new ReplaySubject<Message>();
  messageEvent$ = this.messageSource.asObservable();

  success(header: string, detail: string) {
    this.messageSource.next({
      type: 'success',
      header,
      detail,
    });
  }

  info(header: string, detail: string) {
    this.messageSource.next({
      type: 'info',
      header,
      detail,
    });
  }

  warn(header: string, detail: string) {
    this.messageSource.next({
      type: 'warn',
      header,
      detail,
    });
  }

  error(header: string, detail: string) {
    this.messageSource.next({
      type: 'error',
      header,
      detail,
    });
  }
}
