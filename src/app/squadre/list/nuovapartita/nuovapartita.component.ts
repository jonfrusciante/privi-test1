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
import {UserService} from '../../../user-profile/user.service';
import {AuthService} from '../../../core/auth.service';
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
interface Match {
  userhome?: string;
  userAway?: string;
  prenotazione?: Prenotazioni;
  confermato?: boolean;
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
  prengrab: Prenotazioni;
  theuser: User;
  constructor(private afs: AngularFirestore, private _formBuilder: FormBuilder, private mio: AuthService) {
    this.userCtrl = new FormControl();
    this.users = this.afs.collection('users').snapshotChanges().map(
      action => {
        return action.map(
          actions => {
            const data = actions.payload.doc.data() as User;
            const id = actions.payload.doc.id;
            return{id , ...data };
          });
      });
    this.userCtrl.valueChanges.subscribe( user => this.invia(user));
    this.mio.user.subscribe(
      user => {
        this.theuser = user;
      }
    );

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
  onInput(event) {
  this.date = event.value;
  // this.giorno = this.date.getMonth() + 1;
  this.data_grabbed =  format(event.value, 'DD-MM-YYYY');
  console.log(this.data_grabbed);
  }
  toggleState() {
    this.stateFlag = !this.stateFlag;
  }
  getDisponibilita() {
    this.items = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot').snapshotChanges().map(
      action => {
        return action.map(
          actions => {
            const data = actions.payload.doc.data() as Prenotazioni;
            const id = actions.payload.doc.id;
            return{id , ...data };
          });
      });
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
  // this.prengrab = event;
  console.log(this.secondFormGroup.value.secondCtrl);
  }
  inviaRic(homeid , awayid, prenotazione:Prenotazioni ){
      const match: Match = {confermato: false};
      match.userhome = homeid;
      match.userAway = awayid;
      match.prenotazione = prenotazione;
      console.log(match);
      this.afs.collection('match').add(match);
}
  inviarichesta(user_away: User , prenotazione: Prenotazioni, userCapitanuid: string) {
    const pren: RichiesteOut = {};
    pren.useraway = user_away;
    pren.prenotazioneSlot = prenotazione;
    pren.confermato = false;
    const prenIn: RichiesteIn = {};
    prenIn.dataUser = this.theuser;
    prenIn.userhomeid = userCapitanuid ;
    prenIn.prenotazioneSlot = prenotazione;
    prenIn.confermato = false;
    const fin: RichiesteOut = {userHomeuid : userCapitanuid , userAwayuid: user_away.uid , prenotazioneSlot: prenotazione };
    this.afs.collection('users').doc(userCapitanuid).collection('richesteOut').add(pren);
    this.afs.collection('users').doc(user_away.uid).collection('richesteIn').add(prenIn);
    this.afs.collection('Richieste').add(fin);

  }

}
