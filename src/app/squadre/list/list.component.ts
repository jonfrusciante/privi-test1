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
  selectedsqadra: Squadre;
  user: User;
   vis= false;
  visa= false;
  SquadreArray: Squadre[];

  constructor(public squadre: SquadreService) {
    this.squadre.getsquadra().subscribe( x => {
      this.SquadreArray = x ;
    }
    );
    this.squdare$ = this.squadre.getsquadra();
    this.squdare$.subscribe( x => {
        this.selectedsqadra = x ;
      }
    );
  }

  ngOnInit() {
    // this.squdare$.subscribe();

   // this.getsquadre();
  }

  getsquadre() {
    this.squdare$ = this.squadre.getsquadra();
  }
  rimuovisquadra(uid) {
    console.log(uid);
    this.squadre.delsquad(uid);

  }
  mostrauteni(squadra: Squadre) {
     this.utenti$ = this.squadre.getallfriends();
     this.selectedsqadra = squadra ;
  }
  aggiungiPlayer(user: User, squadra: Squadre) {
    this.squadre.addplayer(user, squadra);
    console.log(user, squadra);
  }
  rimuovigiocatore(us: User, sq: Squadre){
    this.squadre.rimuovigiocatore(us, sq).subscribe();
  }
}
