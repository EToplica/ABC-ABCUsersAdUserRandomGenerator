import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthToken } from '../token.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from '../../models/user/User';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseFirestore, FirebaseStorage} from '@angular/fire';

const authUrl = environment.authUrl;
const apiKey = environment.apiKey;
const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    profileUpdated: Subject<boolean> = new Subject<boolean>();
    userProfile: User;
  authState: any = null;
  currentUser: User;
  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth
  ) {
  }
    login(body: any): Promise<any> {
      return this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(body.email, body.password);
    }
    signOut() {
      this.angularFireAuth.auth.signOut();
    }
    public getToken(): string {
        return localStorage.getItem('token');
    }
    getUserProfile(): User {
        return this.userProfile;
    }
    public isAuthenticated(): boolean {
        const token = this.getToken();
        return !jwtHelper.isTokenExpired(token);
    }
}
