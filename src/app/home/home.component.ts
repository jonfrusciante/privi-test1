import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Prenotazioni} from '../admin/prenotazioni';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public link = "../assets/mockupmagliette.png"
  public itemCollec: AngularFirestoreCollection<Prenotazioni>;
  public prenotazioni: Observable<Array<Prenotazioni>>;
  // private voidDoc: AngularFirestoreDocument<any>;
  public registerForm: FormGroup;

  title = 'Valguarnera Sports Club ';
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  public imageSources: string[] = [
    '../assets/calcio.jpg',
    '../assets/campo-calcetto,13858.jpg',
    '../assets/inaugurazione nuovo campo di calcetto oratorio  via verità e vita .jpg'
  ];
  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 4000,
    stopAutoplayMinWidth: 768
  };
  prenoCollectionRef: AngularFirestoreCollection<Prenotazioni>;
  private preno$: Observable<Prenotazioni[]>;
  prenotaz: Prenotazioni[]= [];
  preno1$: Array<Observable<Prenotazioni>>;

  constructor(private afs: AngularFirestore, private fb: FormBuilder) {

    // this.itemCollec('prenotazioni_campo1',ref => ref.where('username','=','pinoscasso'))
  }

  private findrange(startdate, enddate) {
   // console.log(startdate, enddate);

    let ora: string;
    let dates = [],
      currentdate = startdate,

      adddays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentdate <= enddate) {
      const mese = currentdate.getMonth() + 1;
      const data_grabbed = currentdate.getDate() + '-' + mese + '-' + currentdate.getFullYear();
      dates.push(currentdate.getDate() + '-' + mese + '-' + currentdate.getFullYear());
     // console.log(data_grabbed);
      this.prenoCollectionRef = this.afs.collection('disponibilita_campo1').doc(data_grabbed).collection('slot', ref => ref.where('username', '==', 'pino scasso'));
      this.preno$ = this.prenoCollectionRef.snapshotChanges().map(action => {
        return action.map(actions => {
          const id = actions.payload.doc.id ;

          const data = actions.payload.doc.data() as Prenotazioni;
          return {id , ...data};
        });
      });
      this.preno$.subscribe(nex => { if (nex.length !== 0) {
        nex.map( x => this.prenotaz.push(x));
      }});
     // this.itemCollec = this.afs.collection('disponibilita_campo1').doc(data_grabbed).collection('slot', ref => ref.where('disponibilita', '==', false));
     // this.itemCollec.valueChanges().subscribe(response => response.map(res => console.log(res.start)));
      currentdate = adddays.call(currentdate, 1);
    }
  }

  ngOnInit() {
this.registerForm = this.fb.group({data: "" });
   // this.findrange(new Date('10-01-2017'), new Date(('10-31-2017')));
    // this.itemCollec = this.afs.collection('disponibilita_campo1/19-10-2017/slot', ref => ref.where('disponibile', '==' ,  true )) ;
    // this.itemCollec.valueChanges().subscribe( response => console.log(response));
  }
  onSubmit(){}
}
