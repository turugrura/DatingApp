import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];
  model: any = {};
  isLoggedin = false;
  currentUser: User;

  constructor(private accountService: AccountService) {
    this.currentUser = {
      username: '',
    };
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  setMenuItems(): void {
    this.items = [
      {
        label: this.currentUser?.username,
        icon: 'pi pi-fw pi-home',
        visible: this.isLoggedin,
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
        visible: this.isLoggedin,
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        visible: this.isLoggedin,
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        visible: this.isLoggedin,
      },
    ];
  }

  login() {
    this.accountService.login(this.model).subscribe(
      () => {},
      (e) => {
        console.log(e);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.isLoggedin = false;
    this.setMenuItems();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
        console.log(user);
        this.isLoggedin = true;
        this.currentUser = user;
        this.setMenuItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
