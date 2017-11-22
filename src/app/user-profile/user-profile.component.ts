import {Component,  Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {Modaltest1Component} from '../login/modaltest1.component';
import {PrimocanvasComponent} from '../canvas/primocanvas/primocanvas.component';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {User} from './user';
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

  usersAutenticato: User;
  constructor(public  dialog: MatDialog, public auth: AuthService,  private afs: AngularFirestore) {
   this.usersAutenticato = this.auth.theuser;
  }
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
  telef(event) {
    this.usersAutenticato.telefon = event.target.value ;
    this.updateUser();
  }
  indirizzo(event) {
    this.usersAutenticato.indirizzo = event.target.value ;
    this.updateUser();
  }
   updat(imagelink: string) {
     this.usersAutenticato.photoURL = imagelink;
     this.updateUser();

   }
   /*
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
  */   // onfilechange
  updateUser() {
  this.itemDoc = this.afs.collection('users').doc(this.usersAutenticato.uid) ;
    console.log(this.usersAutenticato);
  // this.itemDoc.update(this.usersAutenticato);
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



  ngOnInit() {
    this.configcrop();
  }

}
