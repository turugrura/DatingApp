import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotificationService } from '../notification/notification.service';
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
  currentUser!: User;

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  setMenuItems(): void {
    this.items = [
      {
        label: this.currentUser?.username,
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
        visible: this.isLoggedin,
      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   routerLink: '',
      //   items: [
      //     {
      //       label: 'Left',
      //       icon: 'pi pi-fw pi-align-left',
      //     },
      //     {
      //       label: 'Right',
      //       icon: 'pi pi-fw pi-align-right',
      //     },
      //     {
      //       label: 'Center',
      //       icon: 'pi pi-fw pi-align-center',
      //     },
      //     {
      //       label: 'Justify',
      //       icon: 'pi pi-fw pi-align-justify',
      //     },
      //   ],
      //   visible: this.isLoggedin,
      // },
      {
        label: 'Members',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/members'],
        visible: this.isLoggedin,
      },
      {
        label: 'Lists',
        icon: 'pi pi-fw pi-user',
        routerLink: '/lists',
        visible: this.isLoggedin,
      },
      {
        label: 'Messages',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/messages',
        visible: this.isLoggedin,
      },
    ];
  }

  login() {
    this.accountService.login(this.model).subscribe(() => {
      this.notificationService.success('Welcome!', '');
    });
  }

  logout() {
    this.accountService.logout();
    this.isLoggedin = false;
    this.setMenuItems();
    this.notificationService.info('Goodbye!', '');
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
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
