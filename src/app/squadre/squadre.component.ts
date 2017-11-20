import { Component, OnInit } from '@angular/core';
import {SquadreService} from '../squadre.service';
import {Squadre} from '../model/squadre';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-squadre',
  templateUrl: './squadre.component.html',
  styleUrls: ['./squadre.component.css']
})
export class SquadreComponent implements OnInit {
  squadraUser: Observable<Squadre>;
  constructor(private squadra: SquadreService) {

  }
getsquadre() {
    this.squadraUser = this.squadra.getsquadra();
}
  ngOnInit() {
    this.getsquadre();
  }

}
