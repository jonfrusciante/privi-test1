import { Injectable } from '@angular/core';
import {AuthService} from './core/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from './user-profile/user';
import {Squadre} from './model/squadre';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class SquadreService {
   user$: Observable<User>;
   squadra$: Observable<Squadre[]>;
   squadraCollection$: AngularFirestoreCollection<Squadre>;
  constructor(private user: AuthService, private afs: AngularFirestore) {
    this.user$ = this.user.user;
    this.user$.subscribe(
      value => {
        this.squadraCollection$ = this.afs.collection('users').doc(value.uid).collection('squadre');
        this.squadra$ = this.afs.collection('users').doc(value.uid).collection('squadre').valueChanges();
      });
  }
  getallfriends(): Observable<User[]> {
    return this.afs.collection('users').valueChanges();
  }
  getsquadra(): Observable<Squadre> {
    return this.squadra$;
}
  delsquad(id) {
    this.squadraCollection$.doc(id).delete();
  }
}
