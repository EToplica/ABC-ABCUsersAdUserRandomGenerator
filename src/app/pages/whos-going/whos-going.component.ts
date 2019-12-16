import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';
import {fadeInRightAnimation} from '../../../@fury/animations/fade-in-right.animation';
import {fadeInUpAnimation} from '../../../@fury/animations/fade-in-up.animation';
import {RandomUserComponent} from './random-user/random-user.component';
import {User} from '../../models/user/User';
import {UserComponent} from '../users/user/user.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../authentication/services/auth.service';
import {FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import {UsersComponent} from '../users/users.component';



@Component({
  selector: 'fury-whos-going',
  templateUrl: './whos-going.component.html',
  styleUrls: ['./whos-going.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class WhosGoingComponent implements OnInit {
  pcChoice: User[] = [];
  randomUsers = localStorage.getItem('rndUser');

  isCollapsed: boolean = true;
  columns: ListColumn[] = [
    { name: 'NAME', property: 'name', visible: true, isModelProperty: false },
  ] as ListColumn[];
  constructor(
  private usersService: UsersService,
  private dialog: MatDialog,

  private router: Router,
  private snackbar: MatSnackBar,
  private firestore: AngularFirestore,
  private angularFireAuth: AngularFireAuth,
  private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.usersService.getUsers().subscribe(response => {
      this.pcChoice = response;
      console.log('USERS:', response);
    });
  }
  createUser() {
    const usersLength = this.pcChoice.length;
 //   console.log('Length of users = ', usersLength);
    // tslint:disable-next-line:no-shadowed-variable
    const random =  Math.floor(Math.random() * Math.floor(usersLength));
  //  console.log('Random = ', random);
//    console.log('User = ', this.pcChoice[random].name);
    this.randomUsers = this.pcChoice[random].name;
    localStorage.setItem('rndUser', this.randomUsers);
    this.isCollapsed = false;
    this.dialog.open(RandomUserComponent).afterClosed().subscribe((accepted: boolean) => {
    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
}
