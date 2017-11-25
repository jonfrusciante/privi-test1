import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
import {UserService} from '../../user-profile/user.service';
import {Prenotazioni} from '../../admin/prenotazioni';
import {AuthService} from '../../core/auth.service';
import 'rxjs/add/operator/map';


interface RichiesteOut {
  userHomeuid?: string;
  userAwayuid?: string;

  useraway?: User ;
  prenotazioneSlot?: Prenotazioni ;
  confermato?: false;

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
  user: User;
  constructor(private afs: AngularFirestore , private userR: AuthService) {
}
getuser() {
  this.userR.user.subscribe( us => {
    this.user = us;
    this.richestout$ = this.afs.collection('users').doc(this.user.uid).collection('richesteOut', ref => ref.where('confermato', '==', false)).valueChanges();
    this.afs.collection('users').doc(this.user.uid).collection('richesteIn', ref => ref.where('confermato', '==', false)).snapshotChanges().map(
      a => {return a.
      map(richeste => {
          const ric = richeste.payload.doc.data() as RichiesteIn;
          const ha: AngularFirestoreDocument<User> = this.afs.collection('users').doc(ric.userhomeid);
          ha.valueChanges().
          subscribe(usa => {
            ric.dataUser = usa;
            return this.richestin$ = Observable.of(ric);
          });
          });
      }
    );

  });
}
  ngOnInit() {
    this.getuser();
  }
}
