import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  redirectProfilo(){
    this.router.navigate(['profilo']);
  }
  ngOnInit() {
  }

}
