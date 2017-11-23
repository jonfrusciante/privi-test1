import {Component, Input, OnInit} from '@angular/core';
import {Squadre} from '../../../model/squadre';
import {User} from '../../../user-profile/user';

@Component({
  selector: 'app-nuovapartita',
  templateUrl: './nuovapartita.component.html',
  styleUrls: ['./nuovapartita.component.css']
})
export class NuovapartitaComponent implements OnInit {
@Input() squadra: Squadre;
user: User;
  constructor() { }

  ngOnInit() {
  }

}
