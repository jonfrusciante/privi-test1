import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../user-profile/user';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
@Input() player: User;
@Output() userSelected: EventEmitter<User> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onAction(user: User) {
    this.userSelected.emit(user);
  }
}
