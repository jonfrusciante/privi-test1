import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Intrfacciatest} from '../intrfacciatest';
import { HttpParams } from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../core/auth.service';
import {Prenotazioni} from '../admin/prenotazioni';
import {
  subDays,
  addDays,
  format
} from 'date-fns';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Component({
  selector: 'app-prenota',
  templateUrl: './prenota.component.html',
  styleUrls: ['./prenota.component.css'],
})


export class PrenotaComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Prenotazioni>;
  private itemscollection: AngularFirestoreCollection<Prenotazioni>;
  a: User;
  items: Observable<Prenotazioni[]>;
  user: Observable<User>;
  giorno: number;
  stateFlag = true;
  data_grabbed: string;
  message: Array<string> = Array();
  date = new Date();
  aviable_date: Array<any>;
  time_gabbed: string;
  constructor(private http: HttpClient, private afs: AngularFirestore , public auth: AuthService) {
    this.user = this.auth.user;
    this.user.subscribe(data => this.a = data);
  }
  gettime(event) {
    this.time_gabbed = event;
    console.log( event);

  }
  toggleState() {
    this.stateFlag = !this.stateFlag;
  }
  calculate() {
    return {
      visi: this.stateFlag
    };
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
  onInput(event) {
    this.date = event.value;
    this.giorno = this.date.getMonth() + 1;
    this.data_grabbed =  format(event.value, 'DD-MM-YYYY');
    console.log(this.data_grabbed);
  }

  gethour() {
    const params = new HttpParams().set('selectedDate' , this.data_grabbed );
    console.log(params);
    this.http.get<any>('http://127.0.0.1:8081/api/availableHours', { params }  ).subscribe(data => {
      console.log(data.availableHours);
      this.aviable_date = data.availableHours;
    });
  }
  prenota_test() {
    this.http.post<Intrfacciatest>('http://127.0.0.1:8081/api/reserve' , {selectedDate: this.data_grabbed , selectedHour: this.time_gabbed , userData : {name: 'gino'}}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
    );
  }
  getdata() {
    this.http.get<Intrfacciatest>('http://127.0.0.1:8081/api'  ).subscribe(data => {
      console.log(data);
      this.message.push(data.message);
    });
  }
  setdata(event: string) {
    console.log(this.a);
    // this.items = this.afs.collection<Prenotazioni>('disponibilita_campo1/1-1-2017/slot').valueChanges();
    this.time_gabbed = event;
    console.log(this.time_gabbed);
    this.itemDoc  = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot').doc(this.time_gabbed);
    const dd: Prenotazioni = {
      // start: this.time_gabbed,
      disponibile: false,
      user: this.a.uid,
      username: this.a.displayName ,
      title: this.time_gabbed + ' reserved by ' + this.a.displayName,
      color: {primary: '#0069D9', secondary: '#FAE3E3'} };
      this.itemDoc.update(dd);
    // this.itemDoc.delete();
    // this.itemDoc.set(dd);
  }
  getDisponibilita() {
    this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot');
    this.items = this.itemscollection.valueChanges();
  }

    ngOnInit() {
    this.data_grabbed = format(this.date, 'DD-MM-YYYY');
    this.getDisponibilita();
  }
}
