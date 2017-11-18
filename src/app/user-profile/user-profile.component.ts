import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../core/auth.service';
import { FileUploader } from 'ng2-file-upload';
import {UserService} from './user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {Modaltest1Component} from '../login/modaltest1.component';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  telefon?: string;
  indirizzo?: string;
}
interface Risposta {
  data: Dat;
}
interface Dat {
  link: string;
}
interface Result {
  userId: string;
  id: string;
  title: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
 // @Output() addUserEvent = new EventEmitter<User>();
  @Input() public userPass: User;

  public itemDoc: AngularFirestoreDocument<User>;
  User$: Observable<User[]>;

  data$: Observable<Risposta>;

  users: User;
  public uploader: FileUploader = new FileUploader({url: URL});
  openDialog(user) {
    console.log(user);
this.dialog.open(Modaltest1Component, {
  data: {
    userPass: user
  }
});
   // this.addUserEvent.emit(user);
  }

  telef(event, user) {
    this.users = user;
  this.users.telefon = event.target.value ;
  console.log(this.users);
  }
  indirizzo(event, user) {
    this.users = user;
    this.users.indirizzo = event.target.value ;
  }

  onFileChange(event, user) {
    this.users = user;
    console.log('onfile');
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
     this.usrServ.getauttoken(reader.result.split(',')[1]).subscribe(n => {
          this.users.photoURL = n.data.link;
          console.log(this.users);
          this.updateUser();
        });  // console.log(reader.result.split(',')[1]);;
      };
    }
  }
  updateUser() {
  this.itemDoc = this.afs.collection('users').doc(this.users.uid) ;
  this.itemDoc.update(this.users);
  }

  getUser() {
    this.auth.user.subscribe(n  => {
      this.users = n;
    });
  }

  constructor(public  dialog: MatDialog, public auth: AuthService, private usrServ: UserService, private afs: AngularFirestore, private user: UserService) {

  }

  private populateUsers() {
    this.usrServ.getApi().subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          console.log('😺 Done!', event.body);
          this.users = event.body;
      }
    });
  }
  checkuser(user) {
    if (user === null) {
      return 'Guest';
    }
     return user;
  }
  ngOnInit() {
    this.getUser();
    this.User$ = this.user.getuser();
// this.users$ = this.usrServ.getData();
// this.users$ = this.usrServ.getauttoken(a);
  }
  modificaprofilo(user){


}

}
