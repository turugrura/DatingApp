import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { BusyService } from './_services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AccountService,
    public busyService: BusyService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr) as User;
      this.accountService.setCurrentUser(user);
    }
  }

  getUsers() {}
}
