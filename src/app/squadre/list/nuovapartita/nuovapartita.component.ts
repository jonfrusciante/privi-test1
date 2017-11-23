import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Squadre} from '../../../model/squadre';
import {User} from '../../../user-profile/user';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-nuovapartita',
  templateUrl: './nuovapartita.component.html',
  styleUrls: ['./nuovapartita.component.css']
})
export class NuovapartitaComponent implements OnInit {
@Input() squadra: Squadre;
user: User;
@Output() addUserEvent = new EventEmitter<User>();

  userCtrl: FormControl;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {

    this.userCtrl = new FormControl();
    this.users = this.afs.collection('users').valueChanges();
    this.userCtrl.valueChanges.subscribe( user => this.invia(user));
  }
  invia(user) {
    console.log(user);
    this.addUserEvent.emit(user);
  }
  ngOnInit() {
  }

}
