import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;
  isShow = false;

  constructor() {}

  busy() {
    this.busyRequestCount++;
    this.isShow = true;
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isShow = false;
    }
  }
}
