import { Component, OnInit } from '@angular/core';
import {SquadreService} from '../../squadre.service';
import {Observable} from 'rxjs/Observable';
import {Squadre} from '../../model/squadre';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  squdare$: Observable<Squadre[]>;


  constructor(private squadre: SquadreService) { }

  ngOnInit() {
  }

}
