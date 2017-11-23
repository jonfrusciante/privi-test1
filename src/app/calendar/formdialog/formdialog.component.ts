import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';

class Userclass {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}
@Component({
  selector: 'app-formdialog',
  templateUrl: './formdialog.component.html',
  styleUrls: ['./formdialog.component.css']
})
export class FormdialogComponent implements OnInit {
  filteredStates: Observable<any[]>;
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
