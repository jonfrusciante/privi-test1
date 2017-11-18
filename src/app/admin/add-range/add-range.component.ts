import { Component, OnInit } from '@angular/core';
import {PrenotazioniService} from "../prenotazioni.service";
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
@Component({
  selector: 'app-add-range',
  templateUrl: './add-range.component.html',
  styleUrls: ['./add-range.component.css'],
  providers: [PrenotazioniService]

})
export class AddRangeComponent implements OnInit {
  dates;
  date = new Date();
  startdate: string;
  enddate: string;



  constructor(private prenotaservice: PrenotazioniService) { }

  onInputStart(event) {
    this.date = event.value;
    this.startdate =  format(this.date, 'MM-DD-YYYY');
    console.log(this.startdate);
  }
  onInputEnd(event) {
    this.date = event.value;
    this.enddate =  format(this.date, 'MM-DD-YYYY');
    console.log(this.enddate);
  }

  addRange() {
    this.prenotaservice.setRange(new Date(this.startdate), new Date(this.enddate));
 //    console.log(this.dates);
  }
  ngOnInit() {
  }

}
