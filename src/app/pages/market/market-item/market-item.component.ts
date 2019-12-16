import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingButton} from '../../../models/general/LoadingButton';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MarketService} from '../../../services/market.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'fury-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss']
})
export class MarketItemComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  saveButton: LoadingButton = new LoadingButton('Save');

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<MarketItemComponent>,
              private snackbar: MatSnackBar,
              private marketService: MarketService,
              private angularAuth: AngularFireAuth,
              private userService: UsersService
  ) {
  }

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
        userName: new FormControl(this.userService.currentUser.name, []),
        email: new FormControl(this.userService.currentUser.email, []),
        name: new FormControl(this.defaults.name, [Validators.required]),
        money: new FormControl(this.defaults.money, [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?/)]),
        date: new FormControl(today, [Validators.required])
      }
    );
  }
  save() {
    if (!this.form.valid) {
      console.log('INVALID FORM', this.form);
      return;
    }
    this.saveButton.active = true;
    if (this.mode === 'create') {
      this.createMarketItem();
    } else {
      this.updateMarketItem();
    }
  }
  cancel() {
    this.dialogRef.close(true);
  }

  createMarketItem() {
    const formValue = this.form.value;
    delete formValue['id'];
    this.marketService.addMarketItem(formValue).then(response => {
      console.log('New market item', response);
      this.saveButton.active = false;
      this.dialogRef.close(true);
      this.snackbar.open(`"${this.form.get('name').value}" successfully added to the list!`, '', {panelClass: 'success-toast'});
    });
  }
  updateMarketItem() {
    const formValue = this.form.value;
    const id = formValue['id'];
    delete formValue['id'];
    this.marketService.updateMarketItem(id, formValue).then(response => {
      console.log('update market item', response);
      this.saveButton.active = false;
      this.dialogRef.close(true);
      this.snackbar.open(`Market item successfully updated!`, '', {panelClass: 'success-toast'});
    });
  }
}
