import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {UserClass} from './user-class';
import {AuthService} from '../core/auth.service';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

interface ItemsResponse {
  results: string[];
}
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  telefon?: string;
  indirizzo?: string;
}
interface Result {
  userId: string;
  id: string;
  title: string;
}
@Injectable()
export class UserService {
  private base64textString= '';
  courses$: Observable<Result[]>;
  User$: Observable<User[]>;

   reader = new FileReader();

  url = 'https://jsonplaceholder.typicode.com/users';
  urlpost= 'https://jsonplaceholder.typicode.com/posts';
  results: Result[] ;
posts: Result ;
  private UserCollection: AngularFirestoreCollection<User>;
  private UserDoc: AngularFirestoreDocument<UserClass>;

  user: UserClass = new UserClass();
  getuser() {
this.UserCollection = this.afs.collection('users');
this.User$ = this.UserCollection.valueChanges();
return this.User$ ;
  }

  cercauser() {
   this.UserDoc = this.afs.collection('users').doc(this.user.uid);
   return this.UserDoc ;
 }
  cambiafoto(url) {
    this.user.photoURL = url;
    this.cercauser().update(this.user);
  }
  constructor(private afs: AngularFirestore, private auth: AuthService, private http: HttpClient) {  this.auth.user.subscribe( next => this.user =  next);

  }
  getData() {
    return this.http.get<Result[]>(this.urlpost);
  }
 public getApi() {
   const req = new HttpRequest('GET', this.url, {
     reportProgress: true
   });

   return this.http.request(req);
  }
  handleFileSelect(evt){
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

    getauttoken(image): Observable<any> {
    const id = 'b0581931b12b5b8';
    const url1 = 'https://api.imgur.com/oauth2/authorize';
    const url2 = 'https://api.imgur.com/3/image';

    const header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization':
    'Client-ID ' + id });
     // .set({'Content-Type': 'application/json' , 'authorization'  , 'Client-ID ' +id ); // .append('response_type', 'token');
      // .set('response_type' , 'token');
    return this.http.post(url2, { image: image} , { headers: header}  );
  }

}
