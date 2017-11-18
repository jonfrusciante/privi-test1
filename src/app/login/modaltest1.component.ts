import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

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
  selector: 'app-modaltest1',
  templateUrl: './modaltest1.component.html',
  styles: []
})
export class Modaltest1Component implements OnInit {
  public userPass: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userPass: User },
    private matDialogRef: MatDialogRef<Modaltest1Component>
  ) { }
close(){
    this.matDialogRef.close();
}
  ngOnInit() {
    this.userPass = this.data.userPass;

  }

}
