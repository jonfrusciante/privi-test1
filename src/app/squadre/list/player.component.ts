import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user-profile/user';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
@Input() player: User;
  constructor() { }

  ngOnInit() {
  }
  onAction(event){

  }
}
