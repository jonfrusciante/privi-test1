import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  telefon?: string;
  indirizzo?: string;
}
@Component({
  selector: 'app-hometeam',
  templateUrl: './hometeam.component.html',
  styleUrls: ['./hometeam.component.css']
})
export class HometeamComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<User>();

  public userPass1: Observable<Array<User>>;
  constructor(private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: { userPass1: Observable<Array<User>> },
    private matDialogRef: MatDialogRef<HometeamComponent>
  ) {

  }
aggiungi(user) {
     this.userUpdated.emit(user);
     this.matDialogRef.close();

}
  ngOnInit() {
  }

}
