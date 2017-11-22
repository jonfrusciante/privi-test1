import { Injectable } from '@angular/core';
import {AuthService} from './core/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user-profile/user';
import {Squadre} from './model/squadre';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class SquadreService {
  private UserCollection: AngularFirestoreCollection<User>;
   miouser: User;
   user$: Observable<User>;
   squadra$: Observable<Squadre[]>;
   squadraCollection$: AngularFirestoreCollection<Squadre>;
  constructor(private user: AuthService, private afs: AngularFirestore) {
   // const userino: User = this.user.theuser;
    this.user.user.subscribe(
      userino => {
        this.miouser = userino ;
        this.UserCollection = this.afs.collection<User>('users');
        this.squadraCollection$ = this.afs.collection('users').doc(userino.uid).collection('squadre');
        this.squadra$ = this.afs.collection('users').doc(userino.uid).collection('squadre').valueChanges();
      }
    );
 //   this.UserCollection = this.afs.collection<User>('users');
 //   this.squadraCollection$ = this.afs.collection('users').doc(userino.uid).collection('squadre');
 //   this.squadra$ = this.afs.collection('users').doc(userino.uid).collection('squadre').valueChanges();
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
  // aggiungi giocatore a una squadra metodo
  addplayer(user: User , squadra: Squadre) {
    const _squadra = squadra;

    const include = _squadra.giocatori.filter(vendor => (vendor.uid === user.uid));
    if (include.length > 0) {
     // this.modificasquadra(this.scudrucce , user);
      alert('ilgiocatore è gia presente nella tua squadra');
    }else {
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
// rimuovi player from squadra
  rimuovigiocatore(giocatori: User, scuadra: Squadre) {
    const _squadra = scuadra;

   return this.squadraCollection$.doc(_squadra.Uid).snapshotChanges().map (
      result => {
        const squadre = result.payload.data() as Squadre;
        const filtered = squadre.giocatori.filter(function(el) { return el.uid !== giocatori.uid ; });
        squadre.giocatori = filtered;
        this.UserCollection.doc(_squadra.capitan_uid).collection('squadre').doc(_squadra.Uid).update(squadre);
        this.squadraCollection$.doc(_squadra.Uid).update(squadre);      }
    );
  }
}
