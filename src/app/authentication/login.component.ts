import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {fadeInUpAnimation} from '../../@fury/animations/fade-in-up.animation';
import {AuthService} from './services/auth.service';
import {LoadingButton} from '../models/general/LoadingButton';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'fury-login',
  templateUrl: './login/login.component.html',
  styleUrls: ['./login/login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  inputType = 'password';
  visible = false;
  loginButton: LoadingButton = new LoadingButton('SIGN IN');
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private auth: AuthService,
              private angularFireAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
    this.loginButton.fullWidth = true;
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.loginButton.active = true;
    const loginBody = this.form.value;
    loginBody['returnSecureToken'] = true;
    this.auth.login(loginBody).then(response => {
        console.log('Login response', response);
        this.loginButton.active = false;
        const user = this.angularFireAuth.auth.currentUser;
        this.router.navigate(['/']);
        this.snackbar.open('Welcome to ABC Roulette', '', {panelClass: 'success-toast'});
      })
      .catch(error => {
        console.log('Login error', error);
        this.loginButton.active = false;
        this.snackbar.open(error.message, '', {panelClass: 'danger-toast'});
      });

  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
