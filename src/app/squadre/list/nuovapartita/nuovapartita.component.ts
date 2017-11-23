import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Squadre} from '../../../model/squadre';
import {User} from '../../../user-profile/user';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nuovapartita',
  templateUrl: './nuovapartita.component.html',
  styleUrls: ['./nuovapartita.component.css']
})
export class NuovapartitaComponent implements OnInit {
@Input() squadra: Squadre;
user: User;
@Output() addUserEvent = new EventEmitter<User>();
// controller stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //
// dati x datapiker
  stateFlag = true;

  userCtrl: FormControl;
  users: Observable<User[]>;
  constructor(private afs: AngularFirestore, private _formBuilder: FormBuilder) {

   // this.userCtrl = new FormControl();

  }
  invia(user) {
    console.log(user);
   // this.addUserEvent.emit(user);
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.users = this.afs.collection('users').valueChanges();
    this.firstFormGroup.valueChanges.subscribe(user => this.invia(user));  // valueChanges.subscribe( user => this.invia(user));
  }
onInput(event){
    console.log(event);
}
  toggleState() {
    this.stateFlag = !this.stateFlag;
  }
}
