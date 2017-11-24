import { Component, OnInit } from '@angular/core';
import {SquadreService} from '../squadre.service';

@Component({
  selector: 'app-squadre',
  templateUrl: './squadre.component.html',
  styleUrls: ['./squadre.component.css']
})
export class SquadreComponent implements OnInit {
  constructor(private squad: SquadreService) {
    this.squad.getsquadra().subscribe();
  }

  ngOnInit() {

  }

}
