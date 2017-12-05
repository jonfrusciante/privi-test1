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
   const search = new URLSearchParams();
   search.set('token', '30c58c744a12ef74b365686b243bec9a5a240c87e974e');
   search.set('uid', '393200771189');
   search.set('to', number);
   search.set('text', testo);
   const options = new RequestOptions({ headers: myHeaders, params: search });

   return this.http.post( this.url, {}, options).map( r =>  r.json()  );
 }
}
