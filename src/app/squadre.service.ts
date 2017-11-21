import { Injectable } from '@angular/core';
import {AuthService} from './core/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from './user-profile/user';
import {Squadre} from './model/squadre';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class SquadreService {
  private UserCollection: AngularFirestoreCollection<User>;

  user$: Observable<User>;
   squadra$: Observable<Squadre[]>;
   squadraCollection$: AngularFirestoreCollection<Squadre>;
  constructor(private user: AuthService, private afs: AngularFirestore) {
    this.UserCollection = this.afs.collection<User>('users');

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
  //aggiungi giocatore a una squadra metodo
  addplayer(user: User , squadra: Squadre){
    const _squadra = squadra;
    console.log(_squadra);

    const include = _squadra.giocatori.filter(vendor => (vendor.uid === user.uid));
    if (include.length > 0) {
      console.log("include");
     // this.modificasquadra(this.scudrucce , user);
      alert('ilgiocatore è gia presente nella tua squadra')
    }else {
      console.log("non include");

      _squadra.giocatori.push(user);
      // console.log(this.scudrucce);
      this.squadraCollection$.doc(_squadra.Uid).update(_squadra);
      this.UserCollection.doc(_squadra.capitan_uid).collection('squadre').doc(_squadra.Uid).update(_squadra);

    }

    // this.scudrucce.giocatori = [];
    // console.log(this.scudrucce);
    // this.scudrucce.giocatori.push(user);
    // console.log(this.scudrucce);
    // this.modificasquadra(this.scudrucce , user);

  }
//rimuovi player from squadra
  rimuovigiocatore(giocatori: User, scuadra: Squadre) {
    this.squadraCollection$.doc(scuadra.Uid).collection('player').doc(giocatori.uid).snapshotChanges().subscribe(
      result => {
        const _squadra = scuadra;
        const user = result.payload.data() as User;
        const filtered = _squadra.giocatori.filter(function(el) { return el.uid !== user.uid ; });
        console.log(filtered);
        _squadra.giocatori = filtered;
        this.UserCollection.doc(_squadra.capitan_uid).collection('squadre').doc(_squadra.Uid).update(_squadra);
        this.squadraCollection$.doc(_squadra.Uid).update(_squadra);      }
    );
  }
}
