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
@Component({
  selector: 'app-richeste',
  templateUrl: './richeste.component.html',
  styleUrls: ['./richeste.component.css']
})
export class RichesteComponent implements OnInit {
  richestout$: Observable<RichiesteOut[]>;
  richestin$: Observable<RichiesteIn[]>;
  richestinc$: Observable<RichiesteIn[]>;
  itemcol: AngularFirestoreCollection<RichiesteIn[]>;
  user: User;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore , private userR: AuthService) {

  }
  getuser(): Observable<RichiesteIn[]> {
     return this.richestin$.map(
      value => {

        return value.map(

        res => {
              const a: AngularFirestoreDocument<User> =  this.afs.collection('users').doc(res.userhomeid);
                return a.valueChanges().subscribe(
                us =>  {  res.dataUser = us ; console.log(res.dataUser) ;  });
          }
        );
      }
    );


  }
  getRichesteOut(): Observable<RichiesteOut[]> {
  return this.userR.user.switchMap(
    (user) => {
      return this.afs.collection('users').doc(user.uid).collection('richesteOut', ref => ref.where('confermato', '==', false)).valueChanges() ;
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
    this.richestinc$.subscribe(
      aaa => console.log(aaa.map(r=>console.log(r)))
    )
    this.richestout$ = this.getRichesteOut();
  }

}
