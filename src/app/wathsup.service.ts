import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WathsupService {
private readonly url = 'https://www.waboxapp.com/api/send/chat';
  constructor(private http: HttpClient) {

  }
 sendmessage(number, testo): Observable<any> {
   const search = {
     token : '30c58c744a12ef74b365686b243bec9a5a240c87e974e',
     uid : '393200771189' ,
     to : number,
     text: testo };
   // const options = new RequestOptions({ headers: myHeaders, params: search });

   return this.http.post( this.url, {token : '30c58c744a12ef74b365686b243bec9a5a240c87e974e',
     uid : '393200771189' ,
     to : number,
     text: testo });
 }
}
