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
   search.set('token', '69b84daf566d36551c09d108681773235a273083e7568');
   search.set('uid', '393200771189');
   search.set('to', number);
   search.set('text', testo);

   return this.http.post( this.url, {}, {
     params: new HttpParams().set('token', '69b84daf566d36551c09d108681773235a273083e7568').set('uid', '393200771189').set('to', number).set('text', testo).set('custom_uid', 'test' + Math.floor((Math.random() * 1000)) )
   });
 }
}
