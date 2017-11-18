import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatIconRegistry} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [  {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {}},
  ]
})
export class LoginComponent implements OnInit {
  modelName: any;
    hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(5) , Validators.maxLength(12)]);

  login() {
    this.auth.emailLogin(this.email.value, this.password.value);
      }

    signup() {
    this.route.navigate(['register']);
    }

  getErrorMessagPassworde() {
    return this.password.hasError('required') ? 'You must enter a value' : this.password.hasError('minlength') ? 'La Password deve essere minimo 5 caratteri' :  this.password.hasError('maxlength') ? 'La Password deve essere massimo 12 caratteri'  : '';
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :  this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(public auth: AuthService , iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private route: Router) {
    iconRegistry.addSvgIcon(
      'googl',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/google.svg'));
  }

  ngOnInit() {
  }

}
