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
  invitaPlayer(id){
    console.log(id);

  }
  rimuovigiocatore(giocatori, squadra) {
    console.log(squadra, giocatori);


    this.squadre.squadraCollection$.doc(scuadra.Uid).snapshotChanges().subscribe(
      result => {
        const _squadra = squadra;
        const user = result.payload.data() as User;
        const filtered =  _squadra.giocatori.filter(function(el) { return el.uid !== user.uid ; });
        console.log(filtered);
        _squadra.giocatori = filtered;
        console.log(_squadra);
        // this.ElimSquadre(squadra);
      }
    );
  }
}
