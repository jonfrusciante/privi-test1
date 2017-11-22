import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
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
  @ViewChild(PrimocanvasComponent) canavas: PrimocanvasComponent;
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
  constructor( private afs: AngularFirestore, private user: AuthService) {
    this.SqudreCollections = this.afs.collection<Squadre>('squadre_create');
    this.UserCollection = this.afs.collection<User>('users');

}
  updatesquadracuore(squadra) {
    if (squadra.value === 'juve') {
      console.log(squadra.value);
      this.canavas.juve();
    }else if (squadra.value === 'inter') {
      console.log(squadra.value);

      this.canavas.inter();
    }else if (squadra.value === 'milan'  ){
      console.log(squadra.value);

      this.canavas.milan();
    }   // console.log(squadra.value);

  }
updatetesto(testo) {
      console.log(testo.target.value);
      this.canavas.inseriscitesto(testo.target.value);
}
  ngOnInit() {
    this.myForm = new FormGroup({
      squadraCuore: new FormControl(),
      nome: new FormControl() ,
    //  logo: new FormControl({value: this.fileImage, disabled: false}),
  //    userid: new FormControl(''),
    });

  }
  setSquadra(squadra: Squadre) {

    this.SqudreCollections.add(squadra).then(value => {
      this.user.user.subscribe(user => {
        squadra.Uid = value.id;
        squadra.capitan_uid = user.uid;
        this.SqudreCollections.doc(value.id).update(squadra);
        console.log(value.id);
        this.addSquadraUser(squadra);
      });

    });

  }
   addSquadraUser(squadra: Squadre) {
    this.UserCollection.doc(squadra.capitan_uid).collection('squadre').doc(squadra.Uid).set(squadra);
  }
  onSubmit(form: FormGroup) {
    console.log(this.canavas.getfileimage());
    this.team = {nome: form.value.nome.toString(), logo: this.canavas.getfileimage(), squadracuore: form.value.squadraCuore.toString()};
    this.team.giocatori = [];
    this.setSquadra(this.team);
    console.log( this.team);
    this.myForm.reset();
//    this.cleanform();
  }

  private cleanform() {
    this.myForm.controls['logo'].setValue('');
    this.myForm.controls['nome'].setValue('');
    this.myForm.controls['squadraCuore'].setValue('');


  }
  fileChange($event) {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        // FAI QUALCOSA CON IL FILE PRONTO

        // this.canavas.nextpass(reader.result);
       // this.myForm.controls['logo'].setValue(reader.result.split(',')[1]);
        // chiamata ad imgurur!! per uplodare la foto e ricevere il link indietro
       // this.usrServ.getauttoken(reader.result.split(',')[1]).subscribe( result => {
       //   this.myForm.controls['logo'].setValue(result.data.link);
         // this.fileImage = result.data.link ; });
      };
    }
  }
}
