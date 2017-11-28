import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
import {UserService} from '../../user-profile/user.service';
import {Prenotazioni} from '../../admin/prenotazioni';
import {AuthService} from '../../core/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


interface RichiesteOut {
  userHomeuid?: string;
  userAwayuid?: string;

  useraway?: User ;
  prenotazioneSlot?: Prenotazioni ;
  confermato?: false;
  ff: Observable<User>;
}
interface RichiesteIn {
  dataUser?: User;
  userhomeid?: string  ;
  prenotazioneSlot?: Prenotazioni ;
  confermato?: false;

}
interface Match {
  userhome?: string;
  userAway?: string;
  prenotazione: Prenotazioni;
  confermato?: boolean;
}
interface Prenotazione {
  data?: string;
  start?: Date ;
  disponibile?: boolean;
  ora?: string;
  user?: string ;
  title?: string;
}
@Component({
  selector: 'app-richeste',
  templateUrl: './richeste.component.html',
  styleUrls: ['./richeste.component.css']
})
export class RichesteComponent implements OnInit {
  richestout$: Observable<RichiesteOut[]>;
  richestin$: Observable<Match[]>;
  richestinc$: Observable<RichiesteIn[]>;
  itemcol: AngularFirestoreCollection<RichiesteIn[]>;
  user: User;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore , private userR: AuthService) {

  }
  getRichesteOut(): Observable<RichiesteOut[]> {
  return this.userR.user.switchMap(
    (user) => {
      return this.afs.collection('users').doc(user.uid).collection('richesteOut', ref => ref.where('confermato', '==', false)).valueChanges() ;
    });
}
ricOut() {
    return this.userR.user.switchMap(
    (user) => {
      return this.afs.collection('match', ref => ref.where('userhome', '==' , user.uid )).snapshotChanges() .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Match;
          const id = a.payload.doc.id;
          const homeUser = this.afs.collection('users').doc(data.userhome).valueChanges();
          const awayUser = this.afs.collection('users').doc(data.userAway).valueChanges();
          const pren =  this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(data.prenotazione.data).collection('slot').doc(data.prenotazione.ora).valueChanges();
          return { homeUser, awayUser , id , pren,  ...data };
        });
      });
   });

}
  getRichesteIn(): Observable<RichiesteIn[]> {
     return this.userR.user.switchMap(
      (user) => {
        return this.afs.collection('users').doc(user.uid).collection('richesteIn', ref => ref.where('confermato', '==', false)).snapshotChanges()
          .map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as RichiesteIn;
              const id = a.payload.doc.id;
              const dod: AngularFirestoreDocument<User> = this.afs.collection('users').doc(data.userhomeid);
              const ff: Observable<User> =  dod.valueChanges();
              return { ff, id , data };
            });
          });

      });
  }


ngOnInit() {
    this.richestinc$ = this.getRichesteIn();
    this.richestout$ = this.getRichesteOut();
    this.richestin$ = this.ricOut();
  }
  removeRic(id) {
    console.log(id);
    this.userR.user.subscribe(
      user =>     this.afs.collection('users').doc(user.uid).collection('richesteIn').doc(id).delete()
    );
  }

}
