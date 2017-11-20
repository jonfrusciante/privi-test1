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
  invitaPlayer(id) {
    console.log(id);

  }
  rimuovigiocatore(giocatori, squadra) {
    console.log(squadra, giocatori);

  }
  rimuovigiocatore(giocatori, scuadra: Squadre) {
    this.squadre.squadraCollection$.doc(scuadra.Uid).snapshotChanges().subscribe(
      result => {
        const squadra = scuadra;
        const user = result.payload.data() as User;
        const filtered =  squadra.giocatori.filter(function(el) { return el.uid !== user.uid ; });
        console.log(filtered);
        squadra.giocatori = filtered;
        console.log(squadra)
        // this.ElimSquadre(squadra);
      }
    );
  }
}
