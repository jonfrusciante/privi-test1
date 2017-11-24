import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Squadre} from '../../../model/squadre';
import {User} from '../../../user-profile/user';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  subDays,
  addDays,
  format
} from 'date-fns';
import {Prenotazioni} from '../../../admin/prenotazioni';
class RichiesteOut {
  constructor(user: User, Prenotazione: Prenotazioni ) {
    this.useraway = user;
    this.prenotazioneSlot = Prenotazione;
  }
  useraway?: User ;
  prenotazioneSlot?: Prenotazioni ;
  confermato? = false;

}
@Component({
  selector: 'app-nuovapartita',
  templateUrl: './nuovapartita.component.html',
  styleUrls: ['./nuovapartita.component.css']
})
export class NuovapartitaComponent implements OnInit {
  event: string;
  show= false;
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
  data_grabbed: string;
  date = new Date();
  time_gabbed: string;
  items: Observable<Prenotazioni[]>;
  userCtrl: FormControl;
  users: Observable<User[]>;
  constructor(private afs: AngularFirestore, private _formBuilder: FormBuilder) {
    this.userCtrl = new FormControl();
    this.users = this.afs.collection('users').valueChanges();
    this.userCtrl.valueChanges.subscribe( user => this.invia(user));
   // this.userCtrl = new FormControl();

  }
  invia(user) {
    this.firstFormGroup.setValue({'firstCtrl' : user});

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
    // this.users = this.afs.collection('users').valueChanges();
   //  this.firstFormGroup.valueChanges.subscribe(user => this.invia(user));  // valueChanges.subscribe( user => this.invia(user));
  }
onInput(event){
  this.date = event.value;
  // this.giorno = this.date.getMonth() + 1;
  this.data_grabbed =  format(event.value, 'DD-MM-YYYY');
  console.log(this.data_grabbed);
  }
  toggleState() {
    this.stateFlag = !this.stateFlag;
  }
  getDisponibilita() {
    this.items = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot').valueChanges();
  }
  public giornoprima() {
    this.date = subDays(this.date , 1);
    this.data_grabbed = format(this.date, 'DD-MM-YYYY');
    console.log(this.data_grabbed);
    this.getDisponibilita();
  }
  public giornodopo() {
    this.date = addDays(this.date , 1);
    this.data_grabbed = format(this.date, 'DD-MM-YYYY');
    console.log(this.data_grabbed);
    this.getDisponibilita();
  }
  setdata(event: Prenotazioni) {
  this.secondFormGroup.setValue({'secondCtrl' : event});
  console.log(this.secondFormGroup.value);
  }
  inviarichesta(user_away: User , prenotazione: Prenotazioni, userCapitanuid: string) {
    const pren = new RichiesteOut(user_away, prenotazione);
    this.afs.collection('users').doc(userCapitanuid).collection('richesteOut').add(pren);
    console.log (pren);
  }
}
