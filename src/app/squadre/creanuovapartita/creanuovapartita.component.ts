import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Prenotazioni} from '../../admin/prenotazioni';
import {Observable} from 'rxjs/Observable';
import {format , subDays, addDays} from 'date-fns';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from '../../user-profile/user';
@Component({
  selector: 'app-creanuovapartita',
  templateUrl: './creanuovapartita.component.html',
  styleUrls: ['./creanuovapartita.component.css']
})
export class CreanuovapartitaComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stateFlag = true;
  items: Observable<Prenotazioni[]>;
  show= false;
  data_grabbed: string;
  date: Date;
  userstoad=[];
  serializedDate = new FormControl((new Date()).toISOString());
  Users$: Observable<User[]>;
  constructor(private _formBuilder: FormBuilder, private afs: AngularFirestore) {

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
  getDisponibilita(dataId) {
    this.items = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(format(dataId, 'DD-MM-YYYY')).collection('slot').snapshotChanges().map(
      action => {
        return action.map(
          actions => {
            const data = actions.payload.doc.data() as Prenotazioni;
            const id = actions.payload.doc.id;
            return{id , ...data };
          });
      });
  }

  ngOnInit() {
    this.Users$ = this.afs.collection('users').valueChanges();
    this.firstFormGroup = this._formBuilder.group({
      data: ['', Validators.required],
      ora: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.firstFormGroup.controls['data'].valueChanges.subscribe(
      n => {this.getDisponibilita(n); this.show = !this.show ; this.date = n ;} );
    this.secondFormGroup.controls['secondCtrl'].valueChanges.subscribe(
      userid => { this.userstoad.push(this.getuserfrom(userid)); }
    )
  }
  public giornoprima() {
    this.date = subDays(this.date , 1);
    this.data_grabbed = format(this.date, 'DD-MM-YYYY');
    console.log(this.data_grabbed);
    this.getDisponibilita(this.date);
  }
  public giornodopo() {
    this.date = addDays(this.date , 1);
    this.data_grabbed = format(this.date, 'DD-MM-YYYY');
    console.log(this.data_grabbed);
    this.getDisponibilita(this.date);
  }
  setdata(event: Prenotazioni) {
    console.log(format(event.start, 'YYYY-MM-DD'));

    this.firstFormGroup.controls['ora'].setValue(event.ora);
    this.firstFormGroup.controls['data'].setValue(format(event.start, 'YYYY-MM-DD') );
    // this.prengrab = event;
  }
  getuserfrom(id: any[]): Observable<User> {
    console.log(id);
    const ids = id.map(a => { return a } );
    console.log(ids);
    return this.afs.collection('users').doc(ids.toString()).valueChanges();
  }

}
