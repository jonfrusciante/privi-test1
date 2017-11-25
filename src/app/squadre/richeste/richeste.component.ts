import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
import {UserService} from '../../user-profile/user.service';
import {Prenotazioni} from '../../admin/prenotazioni';
import {AuthService} from '../../core/auth.service';
interface RichiesteOut {
  userHomeuid?: string;
  userAwayuid?: string;

  useraway?: User ;
  prenotazioneSlot?: Prenotazioni ;
  confermato?: false;

}
interface RichiesteIn {

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
  richest$: Observable<RichiesteOut[]>;
 user: User;
  constructor(private afs: AngularFirestore , private userR: AuthService) {
}
getuser() {
  this.userR.user.subscribe( us => {
    this.user = us ;
    this.richest$ = this.afs.collection('users').doc(this.user.uid).collection('richesteOut' , ref => ref.where('confermato' , '==' , false )).valueChanges();

  })
  ;
}
  ngOnInit() {
    this.getuser();
  }

}
