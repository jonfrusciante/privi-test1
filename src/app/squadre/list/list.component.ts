import { Component, OnInit } from '@angular/core';
import {SquadreService} from '../../squadre.service';
import {Observable} from 'rxjs/Observable';
import {Squadre} from '../../model/squadre';
import {User} from '../../user-profile/user';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  squdare$: Observable<Squadre[]>;
  utenti$: Observable<User[]>;

  constructor(private squadre: SquadreService) { }

  ngOnInit() {
    this.getsquadre();
  }

  getsquadre() {
    this.squdare$ = this.squadre.getsquadra();
  }
  rimuovisquadra(uid) {
    console.log(uid);
    this.squadre.delsquad(uid);

  }
  mostrauteni() {
     this.utenti$ = this.squadre.getallfriends();
  }
  aggiungiPlayer(user: User, squadra: Squadre) {
    this.squadre.addplayer(user, squadra);
    console.log(user, squadra);
  }
  rimuovigiocatore(us: User, sq: Squadre){
    this.squadre.rimuovigiocatore(us, sq).subscribe();
  }
}
