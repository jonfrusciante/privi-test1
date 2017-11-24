import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {isNullOrUndefined} from 'util';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  indirizzo?: string;
  telefon?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  user1: Observable<User>;

  // theuser: User;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  signup(email: string, password: string, ) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
  emailLogin(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        const data: any = {
          uid: credential.uid,
          email: credential.email,
          displayName: credential.displayName};
       this.updateUserData(data);
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // this.router.navigate(['/profilo']);
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
       // this.router.navigate(['profilo']);
      });
  }
  private updateUserData(user) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ,
    };
    // Sets user data to firestore on login
    // let isnull = false;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // this.user = userRef.valueChanges();
    // this.user.subscribe((n) => {if (n == null) { isnull = true;
    // } }).unsubscribe();
    userRef.snapshotChanges().subscribe( r => {
      if (r.payload.exists) {
        userRef.update(data);
        console.log('update data');
        this.router.navigate(['profilo']);

      }else {
        console.log('set data');
        data.photoURL = 'https://st2.depositphotos.com/1448225/9009/v/450/depositphotos_90095224-stock-illustration-soccer-football-player.jpg';
        userRef.set(data);
        this.router.navigate(['profilo']);

      }
    });
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
getus(){
    this.user.subscribe( user => {
      this.user1  = Observable.of(user);
    }
      );
}

}
