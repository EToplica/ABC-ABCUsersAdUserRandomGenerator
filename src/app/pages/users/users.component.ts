import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';
import {fadeInRightAnimation} from '../../../@fury/animations/fade-in-right.animation';
import {fadeInUpAnimation} from '../../../@fury/animations/fade-in-up.animation';
import {UserComponent} from './user/user.component';
import {User} from '../../models/user/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import {AuthService} from '../../authentication/services/auth.service';
import {random} from 'lodash-es';

@Component({
  selector: 'fury-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class UsersComponent implements OnInit {
users: User[] = [];
randomUser: string;
  userId: string;
  columns: ListColumn[] = [
    { name: 'NAME', property: 'name', visible: true, isModelProperty: false },
    { name: 'EMAIL', property: 'email', visible: true, isModelProperty: false },
    { name: 'ACTIONS', property: 'actions', visible: true },
  ] as ListColumn[];
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar,
    private firestore: AngularFirestore,
    private angularAuth: AngularFireAuth,
    private authService: AuthService,

  ) {
  }

  ngOnInit() {
    this.userId = this.angularAuth.auth.currentUser.uid;
    this.getUsers();
  }
  getUsers() {
    this.usersService.getUsers().subscribe(response => {
      this.users = response;
      console.log('USERS:', response);
    });
  }
   // randomUserForMarket() {
   //  const usersLength = this.users.length;
   //   console.log('Length of users = ', usersLength);
   //   // tslint:disable-next-line:no-shadowed-variable
   //  const random =  Math.floor(Math.random() * Math.floor(usersLength));
   //   console.log('Random = ', random);
   //  console.log('User = ', this.users[random].name);
   // }
  createUser() {
    this.dialog.open(UserComponent).afterClosed().subscribe((accepted: boolean) => {
    });
  }
  deleteUser(id) {
    const deletedUser: User = this.users.find(user => user.id === id);
      this.usersService.deleteUser(id).then(response => {
        this.snackbar.open( `${deletedUser.name} successfully deleted!`, '', {panelClass: 'success-toast'});
      });
      if (this.angularAuth.auth.currentUser.uid === id) {
        localStorage.clear();
        this.authService.signOut();
        this.router.navigate([
          '/login'
        ]);
      }
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
}
