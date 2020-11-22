import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || '') as User;
    this.accountService.setCurrentUser(user);
  }

  getUsers() {}
}
