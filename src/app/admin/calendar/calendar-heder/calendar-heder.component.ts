import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-heder',
  templateUrl: './calendar-heder.component.html',
  styleUrls: ['./calendar-heder.component.css']
})
export class CalendarHederComponent  {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'it';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  constructor() { }



}
