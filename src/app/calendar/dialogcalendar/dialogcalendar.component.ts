import { Component, OnInit , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Prenotazioni} from '../../admin/prenotazioni';
import 'rxjs/add/operator/map';
import {AngularFirestoreDocument} from "angularfire2/firestore";

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}
class Userclass {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}
@Component({
  selector: 'app-dialogcalendar',
  templateUrl: './dialogcalendar.component.html',
  styleUrls: ['./dialogcalendar.component.css']
})
export class DialogcalendarComponent implements OnInit {
user = new Userclass();
prenotazione = new Prenotazioni();
   itemDoc: AngularFirestoreDocument<Prenotazioni>;
  constructor(public dialogRef: MatDialogRef<DialogcalendarComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {
    data.prenotazione.subscribe(a => this.prenotazione = a);

  }
test(name) {

  this.prenotazione.title = this.prenotazione.ora + ' reserved by ' + name;
    this.prenotazione.disponibile = false;
    this.prenotazione.username = name;
  this.prenotazione.color = {primary: '#0069D9', secondary: '#FAE3E3'
  };

  console.log( this.prenotazione);
    }

 set(prenotazione) {
  this.data.itemDoc.set(prenotazione);
  this.dialogRef.close();
}
close(){
  this.dialogRef.close();

}
  ngOnInit() {
  }

}
