import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {format, subDays , addDays} from 'date-fns';
import {Prenotazioni} from '../admin/prenotazioni';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.css']
})

export class DataformComponent implements OnInit {
  items: Observable<Prenotazioni[]>;
  date: Date;
  data_grabbed: string;
  stateFlag = true;
  show= false;
  event: any;
  constructor(private afs: AngularFirestore) { }
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
  setdata(item){
    console.log(item);


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
  ngOnInit() {
  }

}
