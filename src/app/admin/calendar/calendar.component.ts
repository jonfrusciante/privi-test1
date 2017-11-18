import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/combineAll';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CalendarEvent } from 'angular-calendar';
import {CalendarEventAction} from 'angular-calendar';
import {
  addDays,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from 'angularfire2/firestore';
import {Prenotazioni} from '../prenotazioni';
import {DialogcalendarComponent} from '../../calendar/dialogcalendar/dialogcalendar.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // Prenot$ = new Subject <CalendarEvent>();
  // PrebotazioniObservalbe=this.Prenot$.switchMap(prenotazione => this.afs.collection('prenotazioni_campo1').valueChanges())
  data_grabbed: string;
  giorno: number;
  private itemscollection: AngularFirestoreCollection<any>;
  view = 'week';
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ prenotazioni: Prenotazioni }>>>;
  events1$: Observable<Array<CalendarEvent<{ prenotazioni: Prenotazioni }>>>  ;
  activeDayIsOpen = false;
  gino: CalendarEvent[];
  tim= '';
  itemss: Observable<Prenotazioni[]>;
  public itemDoc: AngularFirestoreDocument<Prenotazioni>;
  prenotazione: Prenotazioni;
  item: Observable<Prenotazioni>;
name: string;
animal: string;
  constructor(private afs: AngularFirestore , private mdDialog: MatDialog) {

    // this.events.push(this.pre);
  }
  openDialog(item) {
    const dialogref = this.mdDialog.open(DialogcalendarComponent, {
      width: '350px',
      data: { name: 'gino', animal: this.animal, prenotazione: item , itemDoc: this.itemDoc }
    });
    dialogref.afterClosed().subscribe(() => this.fetchEvents()) ;
   // this.item.subscribe(n => this.prenotazione = n);
  }
  fetchEvents(): void {

    this.data_grabbed =  format(this.viewDate, 'DD-MM-YYYY') ;  // .getDate() + '-' + this.giorno + '-' + this.viewDate.getFullYear();
    this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot' , ref => ref.where('disponibile' , '==', true ));
    this.events$ = this.itemscollection.valueChanges() ;
    console.log('inizio tech');
    this.gino = [];
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
      let start  = getStart(this.viewDate);
      const end =  getEnd(this.viewDate);
     // this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(format(start , 'DD-MM-YYYY' )).collection('slot');
     // this.events1$ = this.itemscollection.valueChanges();
       while (start <= end ) {
       const starts = addDays( start , 1 );
       console.log('data srìtart while', format(start , 'DD-MM-YYYY' ));
         this.events1$ = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(format(start , 'DD-MM-YYYY' )).collection('slot').valueChanges();
        // this.events1$.combineLatest(this.events$ );
         this.events1$.subscribe(a => a.map(b => this.gino.push(b)));    // {title: b.title , start: b.start , color: b.color }
         // console.log('ciao', this.gino);
         // this.gino.push(ginoito);
         start = starts;
      //  this.events$ = this.itemscollection.valueChanges()
      // this.events$.combineLatest(this.itemscollection.valueChanges()) ; // = this.itemscollection.valueChanges();
      }
        // this.giorno = this.viewDate.getMonth() + 1;

      // console.log('ciao', this.gino);
    // this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1', ref  => ref.where('start', '>' , format(getStart(this.viewDate), 'DD-MM-YYYY') ) )
    // this.itemscollection = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(this.data_grabbed).collection('slot');
    // this.events$.subscribe(e => this.f = e) ;
   // console.log(this.f);
  }
  eventClicked(event: CalendarEvent<{ prenotazioni: Prenotazioni }> ): void {
    this.viewDate = startOfDay(event.start);
    this.giorno = this.viewDate.getMonth() + 1;
    this.data_grabbed = this.viewDate.getDate() + '-' + this.giorno + '-' + this.viewDate.getFullYear();
     // this.start = event.start;
    this.tim = event.title;
    console.log(this.tim.slice(0, 5));
     this.itemDoc = this.afs.collection<Prenotazioni>('disponibilita_campo1').doc(format(event.start, 'DD-MM-YYYY')).collection('slot').doc(this.tim.slice(0, 5));
     this.item = this.itemDoc.valueChanges();
     this.openDialog(this.item);

    // console.log(this.itemDoc.valueChanges());
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  ngOnInit() {
    this.fetchEvents();
  }
}
