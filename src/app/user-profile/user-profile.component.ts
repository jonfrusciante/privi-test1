import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../core/auth.service';
import { FileUploader } from 'ng2-file-upload';
import {UserService} from './user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {Modaltest1Component} from '../login/modaltest1.component';
import {PrimocanvasComponent} from '../canvas/primocanvas/primocanvas.component';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

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
  // zona mod foto
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  @ViewChild(PrimocanvasComponent) canavas: PrimocanvasComponent;
  data: any;
  cropperSettings: CropperSettings;
  file: any;
  visibility= false;
  visprofchange= false;


 // @Output() addUserEvent = new EventEmitter<User>();
  @Input() public userPass: User;

  public itemDoc: AngularFirestoreDocument<User>;
  User$: Observable<User[]>;

  data$: Observable<Risposta>;
  users: User;
  public uploader: FileUploader = new FileUploader({url: URL});
  // metodi mod foto
  confermafoto(image) {
    console.log(image);
    this.canavas.addimageinlogo(image);
  }
  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }
  openDialog(user) {
    console.log(user);
this.dialog.open(Modaltest1Component, {
  data: {
    userPass: user
  }
});
   // this.addUserEvent.emit(user);
  }
  //
  telef(event, user) {
    this.users = user;
  this.users.telefon = event.target.value ;
  console.log(this.users);
  }
  indirizzo(event, user) {
    this.users = user;
    this.users.indirizzo = event.target.value ;
  }
   updat(imagelink:string, user:User) {
     this.users = user;
     this.users.photoURL = imagelink;
     this.updateUser();

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
  configcrop() {
  this.cropperSettings = new CropperSettings();
  this.cropperSettings.noFileInput = true;
  this.cropperSettings.width = 150;
  this.cropperSettings.height = 150;
  this.data = {};
  this.cropperSettings.rounded = true;
  this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
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
    this.configcrop();
// this.users$ = this.usrServ.getData();
// this.users$ = this.usrServ.getauttoken(a);
  }
  modificaprofilo(user){


}

}
