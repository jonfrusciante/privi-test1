import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   auth: any;
  constructor(private autha: AuthService, private router: Router) { }
  redirectProfilo() {
    this.router.navigate(['profilo']);
  }
  ngOnInit() {
    this.auth =  this.autha ;
  }

}
