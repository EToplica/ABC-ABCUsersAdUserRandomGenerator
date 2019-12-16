import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../models/user/User';
import {AuthService} from '../../../authentication/services/auth.service';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;
  users: User[] = [];
  name: any;

  constructor(
    private router: Router,
    public auth: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  getCurrentUser() {
    this.userService.getCurrentUser().then(response => {
      this.name = response.data().name;
      console.log('this.name = ', this.name)
      this.userService.currentUser = response.data();
      console.log('this.userService.currentUser = ', this.userService.currentUser);
    });
  }
  onClickOutside() {
    this.isOpen = false;
  }

  signOut() {
    localStorage.clear();
    this.auth.signOut();
    this.router.navigate([
      '/login'
    ]);
  }

}
