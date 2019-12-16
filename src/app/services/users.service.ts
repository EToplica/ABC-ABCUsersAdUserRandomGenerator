import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../models/user/User';
import {AuthService} from '../authentication/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
users: User[] = [];
currentUser: any;
  private authState: any;
  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    public auth: AuthService,

  ) { }
  getUsers() {
    return this.firestore.collection('/users').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          console.log('Name', data.name);
          const id = a.payload.doc.id;
          console.log('ID', id);
          localStorage.setItem('id', id);
          return { id, ...data };
        });
      }));
  }
  addUser(users: any) {
    console.log('USERS TO ADD', users);
    return this.firestore.collection('/users').add(users);
  }
  deleteUser(id: string) {
      return this.firestore.doc(`/users/${id}`).delete();
  }
   createUser(userForm: any) {
     return this.angularFireAuth.auth.createUserWithEmailAndPassword(userForm.email, userForm.password).then(cred => {
      return  this.firestore.collection('users').doc(cred.user.uid ).set({
           name: userForm.name,
           email: userForm.email,
           password: userForm.password,
           uid: cred.user.uid,
         });
     });
  }
  getCurrentUser() {
    console.log('USER ID', this.angularFireAuth.auth.currentUser.uid)
    return this.firestore.doc('/users/' + this.angularFireAuth.auth.currentUser.uid).ref.get();
  }
}
