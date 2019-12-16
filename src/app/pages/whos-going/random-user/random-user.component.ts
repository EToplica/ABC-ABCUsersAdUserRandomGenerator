import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingButton} from '../../../models/general/LoadingButton';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user/User';

@Component({
  selector: 'fury-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.scss']
})
export class RandomUserComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  pcChoice: User[] = [];
  saveButton: LoadingButton = new LoadingButton('Save');
  randomUser = localStorage.getItem('rndUser');
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RandomUserComponent>,
    private snackbar: MatSnackBar,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as any;
    }
  //  this.randomUser = localStorage.getItem('randomUser');
    const today = new Date();
    this.form = new FormGroup(
      {
        name: new FormControl(this.defaults.name, [Validators.required]),
      }
    );
    this.getUsers();
  }


  getUsers() {
    this.usersService.getUsers().subscribe(response => {
      this.pcChoice = response;
      console.log('USERS:', response);
    });
  }
  save() {
    if (!this.form.valid) {
      console.log('INVALID FORM', this.form);
      return;
    }
    this.saveButton.active = true;
  }
  tryAgain() {
    const usersLength = this.pcChoice.length;
    //   console.log('Length of users = ', usersLength);
    // tslint:disable-next-line:no-shadowed-variable
    const random =  Math.floor(Math.random() * Math.floor(usersLength));
    //  console.log('Random = ', random);
//    console.log('User = ', this.pcChoice[random].name);
    this.randomUser = this.pcChoice[random].name;
    localStorage.setItem('rndUser', this.randomUser);
  }
  cancel() {
    this.dialogRef.close(true);
  }
}
