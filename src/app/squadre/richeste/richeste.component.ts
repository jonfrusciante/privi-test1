import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
import {UserService} from '../../user-profile/user.service';
import {Prenotazioni} from '../../admin/prenotazioni';
import {AuthService} from '../../core/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {format} from 'date-fns';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/combineLatest';



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
interface Richieste {
  dataid?: string;
  oraid?: string;
  masteruser?: string;
  userObservable: any[];
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
  Richestout$: Observable<Richieste[]>;


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
          const pren =  this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(format(data.prenotazione.start, 'DD-MM-YYYY' )).collection('slot').doc(data.prenotazione.ora).valueChanges();
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
    this.Richestout$ = this.userR.user
      .switchMap( (user) => {
      return this.afs.collection('richieste', ref => ref.where('masteruser', '==' , user.uid)).valueChanges();
    });
    this.getuserfromarr(this.Richestout$).subscribe( y => console.log(y));
  /*  this.Richestout$.subscribe( n => {
      for (const obj of n) {
        for (const obj1 in obj) {
          if ( typeof obj[obj1] === 'boolean') {
            // console.log(obj1);
            return this.afs.collection('users').doc(obj1).valueChanges();
          }
        }
      }
    }); */

  }
  getuserfromarr(arrayRicheste: Observable<Richieste[]>): Observable<any[]> {
    return arrayRicheste.switchMap((n) => {
      const h=[];
      for (const obj of n) {
        console.log(obj);
        for (const obj1 in obj) {
          if ( typeof obj[obj1] === 'boolean') {
            obj.userObservable.push( this.afs.collection('users').doc(obj1).valueChanges());
          }
        }
      }
      console.log(n);

      return Observable.of(n);
    });
  }
  removeRic(id) {
    console.log(id);
   this.afs.collection('match').doc(id).delete();

  }
  getuserfrom(item){
    console.log(item);
  }
}
