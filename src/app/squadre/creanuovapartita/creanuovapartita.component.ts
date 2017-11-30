import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Prenotazioni} from '../../admin/prenotazioni';
import {Observable} from 'rxjs/Observable';
import {format} from 'date-fns';
import {AngularFirestore} from 'angularfire2/firestore';
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

  data_grabbed: string;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

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
    this.firstFormGroup = this._formBuilder.group({
      data: ['', Validators.required],
      ora: [ Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.firstFormGroup.controls['data'].valueChanges.subscribe(
      n => this.getDisponibilita(n) );

  }


}
