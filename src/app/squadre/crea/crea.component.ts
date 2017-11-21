import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../user-profile/user.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from '../../core/auth.service';
import {User} from '../../user-profile/user';
import {PrimocanvasComponent} from '../../canvas/primocanvas/primocanvas.component';
interface Squadre {
  Uid?: string;
  capitan_uid?: string;
  nome?: string;
  logo?: string;
  giocatori?: User[];
  squadracuore?: string;
  user1Uid?: string;
  user2Uid?: string;
  user3Uid?: string;
  user4Uid?: string;
  user5Uid?: string;
}

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css']
})
export class CreaComponent implements OnInit {
  private SqudreCollections: AngularFirestoreCollection<Squadre>;
  private UserCollection: AngularFirestoreCollection<User>;
  myForm: FormGroup;
  fileImage= '';
  friends: any ;
  team: Squadre;
  selectedValue: any;
  squadreCuore = [
    {value: 'milan', nome: 'MILAN'},
    {value: 'juve', nome: 'JUVENTUS'},
    {value: 'inter', nome: 'INTER'},
  ];
  constructor() {


  }

  ngOnInit() {


  }

}
