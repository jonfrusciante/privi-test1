import { Component, OnInit } from '@angular/core';
import {SquadreService} from '../../squadre.service';
import {Observable} from 'rxjs/Observable';
import {Squadre} from '../../model/squadre';

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css']
})
export class CreaComponent implements OnInit {
squdare$: Observable<Squadre[]>;
  constructor(private squadre: SquadreService) { }

  ngOnInit() {
    this.getsquadre();
  }
getsquadre() {
    this.squdare$ = this.squadre.getsquadra();
}
  rimuovisquadra(id){
    this.squadre.delsquad(id)
  }
}
