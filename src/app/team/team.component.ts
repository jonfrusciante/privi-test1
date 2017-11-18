import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {UserService} from '../user-profile/user.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {User} from '../user-profile/user';
import {Observable} from 'rxjs/Observable';
import {MatDialog , MatDialogRef} from '@angular/material';
import {HometeamComponent} from './hometeam/hometeam.component';

interface Squadre {
  Uid?: string;
  capitan_uid?: string;
  nome?: string;
  logo?: string;
  player?: User;
  giocatori?: User[];
  user1Uid?: string;
  user2Uid?: string;
  user3Uid?: string;
  user4Uid?: string;
  user1Name?: string;
  user2Name?: string;
  user3Name?: string;
  user4Name?: string;

}
class SquadreClass {
  Uid?: string;
  capitan_uid?: string;
  nome?: string;
  logo?: string;
  giocatori?: User[];
  user1Uid?: string;
  user2Uid?: string;
  user3Uid?: string;
  user4Uid?: string;
  user1Name?: string;
  user2Name?: string;
  user3Name?: string;
  user4Name?: string;

}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  scudrucce = new SquadreClass();
  Users$: Observable<Array<User>>;
  userlocal: User ;
  private SqudreCollections: AngularFirestoreCollection<Squadre>;
  private UserCollection: AngularFirestoreCollection<User>;
  squadre: AngularFirestoreCollection<Squadre[]>;
  $Squadre: Observable<Array<Squadre>>;
  myForm: FormGroup;
  fileImage= '';
  friends: any ;
  team: Squadre;
  constructor(public  dialog: MatDialog, private usrServ: UserService, private afs: AngularFirestore, private user: AuthService) {
    this.SqudreCollections = this.afs.collection<Squadre>('squadre_create');
    this.UserCollection = this.afs.collection<User>('users');
    // this.dialog.
    this.user.user.subscribe(
      userino => {
        this.userlocal = userino;
        this.squadre =    this.UserCollection.doc(userino.uid).collection('squadre');
        this.$Squadre = this.squadre.valueChanges();

      });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      nome: new FormControl(''),
      logo: new FormControl({value: this.fileImage, disabled: false}),
      userid: new FormControl(''),
    });
  }
  private ElimSquadre(squadraFinal: Squadre ) {
    this.UserCollection.doc(squadraFinal.capitan_uid).collection('squadre').doc(squadraFinal.Uid).update(squadraFinal);
    this.SqudreCollections.doc(squadraFinal.Uid).update(squadraFinal);
  }
 private modificasquadra(squadraFinal: Squadre , user: User) {
   this.UserCollection.doc(squadraFinal.capitan_uid).collection('squadre').doc(squadraFinal.Uid).update(squadraFinal);
   this.SqudreCollections.doc(squadraFinal.Uid).collection('player').doc(user.uid).set(user);
   this.SqudreCollections.doc(squadraFinal.Uid).update(squadraFinal);
  }


  onSubmit(form: FormGroup) {
    console.log(form.value.logo);
    this.team = {nome: form.value.nome.toString(), logo: form.value.logo.toString()};
   // this.setSquadra(this.team);
    console.log( this.team);
    this.cleanform();
  }
  private cleanform() {
    this.myForm.controls['logo'].setValue('');
    this.myForm.controls['nome'].setValue('');

  }
  fileChange($event) {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.usrServ.getauttoken(reader.result.split(',')[1]).subscribe( result => {
          this.myForm.controls['logo'].setValue(result.data.link);
          this.fileImage = result.data.link ;
        });

      };
    }
  }
  searchplayer(squadra) {

    this.UserCollection = this.afs.collection<User>('users');
    this.Users$ = this.UserCollection.valueChanges();
  //  this.Users$.subscribe(result =>{ console.log(result)})
    this.openDialog(this.Users$ , squadra);
  }
  private addplayer(scuadra: Squadre , user: User ) {
    this.scudrucce = scuadra;


    const include = this.scudrucce.giocatori.filter(vendor => (vendor.uid === user.uid));
  //  this.scudrucce.giocatori.includes(user);
   // console.log(include)
    if (include.length > 0) {
      console.log("include");
      this.modificasquadra(this.scudrucce , user);
    }else {
      console.log("non include");

        this.scudrucce.giocatori.push(user);
      // console.log(this.scudrucce);
      this.modificasquadra(this.scudrucce , user);
    }

    // this.scudrucce.giocatori = [];
    // console.log(this.scudrucce);
   // this.scudrucce.giocatori.push(user);
    // console.log(this.scudrucce);
   // this.modificasquadra(this.scudrucce , user);
  }
  rimuovigiocatore(giocatori, scuadra) {
    this.SqudreCollections.doc(scuadra.Uid).collection('player').doc(giocatori.uid).snapshotChanges().subscribe(
      result => {
        this.scudrucce = scuadra;
        const user = result.payload.data() as User;
        const filtered = this.scudrucce.giocatori.filter(function(el) { return el.uid !== user.uid ; });
        console.log(filtered);
        this.scudrucce.giocatori = filtered;
        this.ElimSquadre(this.scudrucce);
      }
    );
  }
  openDialog(user, squadra) {
    // console.log(squadra)
  //  console.log(user);
    const dialogref = this.dialog.open(HometeamComponent, {
      data: {
        userPass1: user
      }
    });
    const sub = dialogref.componentInstance.userUpdated.subscribe(
      result => {
       // console.log(squadra, result)
        this.addplayer(squadra, result);
      }
    );
   // dialogref.afterClosed().subscribe(() => { });
  }


}
