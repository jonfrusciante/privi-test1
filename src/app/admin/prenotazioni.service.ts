import { Injectable } from '@angular/core';
import {Prenotazioni} from './prenotazioni';
import {AngularFirestore,  AngularFirestoreDocument} from 'angularfire2/firestore';
import {
  addDays,
  format
} from 'date-fns';
@Injectable()

export class PrenotazioniService {
  private itemDoc: AngularFirestoreDocument<Prenotazioni>;
  private voidDoc: AngularFirestoreDocument<any>;
  public  data: Prenotazioni;
  public gino = [];

  constructor(private afs: AngularFirestore) {  }
    setRange(startdate, enddate) {
     console.log(startdate, enddate);
    let ora: string;
    let currentdate = startdate ;

    while (currentdate <= enddate) {
     const mese = currentdate.getMonth() + 1 ;
      const data_grabbed = format(currentdate, 'DD-MM-YYYY') ; // currentdate.getDate() + '-' + mese  + '-' +  currentdate.getFullYear();
     // dates.push( currentdate.getDate() + '-' + mese + '-' +  currentdate.getFullYear());
      console.log(data_grabbed);
      let i = 17;
      while (i <= 23) {
        const dat = currentdate.setHours(i);
        // this.gino.push({ora: i.toString() + ':00', disponibile: true});


        const data: Prenotazioni = {
          color: {primary: '#ad2121', secondary: '#FAE3E3'},
          title: i.toString() + ':00' ,
          start: dat,
          ora: i.toString() + ':00' ,
          disponibile: true,
        //  ore: [{ora: i.toString() + ':00', disponibile: true}]
        };
        ora = data.ora;
        this.voidDoc = this.afs.collection<any>('disponibilita_campo1').doc(data_grabbed)  ; // .collection('slot').doc(ora);
         this.voidDoc.set({data: currentdate});
        this.itemDoc = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(data_grabbed).collection('slot').doc(ora);
        this.itemDoc.set(data);
      //  this.itemDoc = this.afs.collection<any>('disponibilita_campo1').doc(data_grabbed)  ; // .collection('slot').doc(ora);
       // this.voidDoc.set({data: currentdate});
       // this.itemDoc = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(data_grabbed).collection('slot').doc(ora);
       // this.itemDoc.update(this.data);
        // dates.push(data);
        i++;
      }
    //  this.itemDoc = this.afs.collection<any>('disponibilita_campo1').doc(data_grabbed)  ; // .collection('slot').doc(ora);
      // this.voidDoc.set({data: currentdate});
      // this.itemDoc = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(data_grabbed).collection('slot').doc(ora);
     // this.itemDoc.set(data);
      currentdate = addDays(currentdate, 1); // adddays.call(currentdate, 1);
    }
    return ;
  }
}


