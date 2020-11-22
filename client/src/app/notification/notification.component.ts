import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [MessageService],
})
export class NotificationComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private messageService: MessageService,
    private noti: NotificationService
  ) {
    this.subscription = this.noti.messageEvent$.subscribe((message) => {
      const summary = message.header;
      const detail = message.detail;

      switch (message.type) {
        case 'success':
          this.messageService.add({
            severity: 'success',
            summary,
            detail,
          });
          break;
        case 'info':
          this.messageService.add({
            severity: 'info',
            summary,
            detail,
          });
          break;
        case 'warn':
          this.messageService.add({
            severity: 'warn',
            summary,
            detail,
          });
          break;
        case 'error':
          this.messageService.add({
            severity: 'error',
            summary,
            detail,
          });
          break;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ddSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  addMultiple() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService',
      },
      {
        severity: 'info',
        summary: 'Info Message',
        detail: 'Via MessageService',
      },
    ]);
  }

  showTopLeft() {
    this.messageService.add({
      key: 'tl',
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
    });
  }

  showTopCenter() {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Message Content',
    });
  }

  showBottomCenter() {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
  }

  clear() {
    this.messageService.clear();
  }
}
