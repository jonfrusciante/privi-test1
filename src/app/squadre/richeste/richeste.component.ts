import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
import {UserService} from '../../user-profile/user.service';
import {Prenotazioni} from '../../admin/prenotazioni';
import {AuthService} from '../../core/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';


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
  richestin1$: Observable<RichiesteIn[]>;
  user: User;
  constructor(private afs: AngularFirestore , private userR: AuthService) {
}
getuser() {
  this.userR.user.subscribe( us => {
    this.user = us;
    this.richestout$ = this.afs.collection('users').doc(this.user.uid).collection('richesteOut', ref => ref.where('confermato', '==', false)).valueChanges();
    this.richestin$ = this.afs.collection('users').doc(this.user.uid).collection('richesteIn', ref => ref.where('confermato', '==', false)).valueChanges();
    this.getuserino();

  });
}
  getuserino() {
    this.richestin$.map(
      a => a.push( b => {  this.afs.collection('users').doc(b.userhomeid).valueChanges().subscribe(
        userr => {
          b.dataUser = userr as User ;

        });
      })
    ).subscribe();
  }
  ngOnInit() {
    this.getuser();
  }
}
