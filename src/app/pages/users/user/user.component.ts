import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingButton} from '../../../models/general/LoadingButton';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

import {UsersService} from '../../../services/users.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'fury-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  saveButton: LoadingButton = new LoadingButton('Save');
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserComponent>,
    private snackbar: MatSnackBar,
    private usersService: UsersService,
    private angularAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as any;
    }
    const today = new Date();
    this.form = new FormGroup(
      {
        id: new FormControl(this.defaults.id, []),
        userId: new FormControl(this.angularAuth.auth.currentUser.uid, []),
        name: new FormControl(this.defaults.name, [Validators.required]),
        email: new FormControl(this.defaults.email, [Validators.required, Validators.email]),
        password: new FormControl(this.defaults.password, [Validators.required, Validators.minLength(6)]),
      });
  }
  save() {
    if (!this.form.valid) {
      console.log('INVALID FORM', this.form);
      return;
    }
    this.saveButton.active = true;
    if (this.mode === 'create') {
      this.createUser();
    } else {
      return;
    }
  }
  cancel() {
    this.dialogRef.close(true);
  }
  createUser() {
    const formValue = this.form.value;
    // delete formValue['id'];
    this.usersService.createUser(formValue).then(response => {
      console.log('New USER: ', response);
      this.saveButton.active = false;
      this.dialogRef.close(true);
      this.snackbar.open(`"${this.form.get('name').value}" successfully added to the list!`, '', {panelClass: 'success-toast'});
    });
  }
}
