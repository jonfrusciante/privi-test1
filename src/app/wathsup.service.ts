import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class WathsupService {
private readonly url = 'https://www.waboxapp.com/api/send/chat';
  constructor(private http: HttpClient) {

  }
 sendmessage(number, testo): Observable<any> {
   const search = new URLSearchParams();
   search.set('token', '30c58c744a12ef74b365686b243bec9a5a240c87e974e');
   search.set('uid', '393200771189');
   search.set('to', number);
   search.set('text', testo);

   return this.http.post( this.url, {}, {
     params: new HttpParams().set('token', '30c58c744a12ef74b365686b243bec9a5a240c87e974e').set('uid', '393200771189').set('to', number).set('text', testo)
   });
 }
}
