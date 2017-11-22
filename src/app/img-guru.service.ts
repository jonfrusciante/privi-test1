import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImgGuruService {

  constructor(private http: HttpClient) { }
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
