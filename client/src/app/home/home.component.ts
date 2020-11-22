import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  registerMode = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  setCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
}
