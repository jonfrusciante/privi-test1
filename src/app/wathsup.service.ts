import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WathsupService {
private readonly url = 'https://www.waboxapp.com/api/send/chat';
  constructor(private http: Http) {

  }
 sendmessage(number, testo): Observable<any> {
   const myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
   const search = {
   token : '30c58c744a12ef74b365686b243bec9a5a240c87e974e',
   uid : '393200771189' ,
   to : number,
   text: testo };
   // let options = new RequestOptions({ headers: myHeaders, params: search });
   console.log(this.url , search);
   return this.http.post( this.url, search).map( r =>  r.json()  );
 }
}
