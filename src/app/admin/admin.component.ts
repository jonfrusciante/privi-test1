import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {PrenotazioniService} from './prenotazioni.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
export interface Prenotazioni {
  disponibile: boolean;
  ora: string;
  user?: string ;
  username?: string ;
}
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PrenotazioniService]
})
export class AdminComponent implements OnInit {
  user: Observable<User> ;
  time_gabbed: string;
  private itemDoc: AngularFirestoreDocument<Prenotazioni>;

  private itemscollection: AngularFirestoreCollection<Prenotazioni>;
  a: User;
  date = new Date();
  giorno: number;
  dates;
  data_grabbed: string;
  item$: Observable<Prenotazioni[]>;

  items: Observable<Prenotazioni[]>;

  item: Observable<Prenotazioni>;


  getDates(startdate, enddate) {
    let ora: string;
    let dates = [],
      currentdate = startdate,
      adddays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentdate <= enddate) {
      this.data_grabbed = currentdate.getDate() + '-' + currentdate.getMonth() + '-' +  currentdate.getFullYear();
      dates.push( currentdate.getDate() + '-' + currentdate.getMonth() + '-' +  currentdate.getFullYear());
      let i = 17;
      while (i <= 24) {
        const data: Prenotazioni = {
          ora: i.toString() + ':00' ,
          disponibile: true};
         ora = data.ora;
        this.itemDoc = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.afs.createId()).collection('slot').doc(ora);

        this.itemDoc.set(data);
        dates.push(data);
          i++;
      }
      currentdate = adddays.call(currentdate, 1);
    }
    return dates;
  }

  onInput(event) {
    this.date = event.value;
    this.giorno = this.date.getMonth() + 1;
    this.data_grabbed =  this.date.getDate() + '-' + this.giorno + '-' + this.date.getFullYear() ;
    console.log(this.data_grabbed);
  }
  setdata(event: string) {
    console.log(this.a);
   // this.items = this.afs.collection<Prenotazioni>('disponibilita_campo1/1-1-2017/slot').valueChanges();
     this.time_gabbed = event;
     console.log(this.time_gabbed);
    this.itemDoc  = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot').doc(this.time_gabbed);
    const data: Prenotazioni = {
      ora: this.time_gabbed,
      disponibile: false,
      user: this.a.uid
    };
    this.itemDoc.delete();
    this.itemDoc.set(data);

  }
   getuser() {
     this.user = this.auth.user;
     this.user.subscribe(data => this.a = data);
     console.log(this.a);
     return this.a.uid;

   }
  getDisponibilita() {
    this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot');
    this.items = this.itemscollection.valueChanges();
  }
  addRange(start, end) {
    this.dates = this.prenotaservice.setRange(new Date(start), new Date(end));
    console.log(this.dates);
  }

  constructor( private afs: AngularFirestore , private prenotaservice: PrenotazioniService, public auth: AuthService) {
   this.user = this.auth.user;
   // console.log(this.a);
    // console.log(this.user.displayName);
    //  this.items = afs.collection<Prenotazioni>('disponibilita_campo1/1-1-2017/slot').valueChanges();
    // this.test = afs.doc<Prenotazioni>('disponibilita_campo1/01-01-2017/slot/17').valueChanges();
    // this.itemscollection =
     // this.items = afs.collection('disponibilita_campo1', ref => ref.where('data', '==', '01-01-2017'))
   // this.items = afs.collection('disponibilita_campo1', ref => ref.where('data', '==', '01-01-2017')).valueChanges();
    // this.items.subscribe(value => console.log(value));
    // console.log(this.items);
    // this.getdates();

  }
  ngOnInit() {

   }

}
