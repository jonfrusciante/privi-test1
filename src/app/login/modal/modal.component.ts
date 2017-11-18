import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modelName: any;
  username = new FormControl('', [Validators.required]);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5) , Validators.maxLength(12)]);
  constructor(public auth: AuthService) { }
  signup() {
    console.log(this.email.value, this.password.value);
    this.auth.signup(this.email.value, this.password.value);
  }
  annulla() {
    this.email.setValue('');
    this.password.setValue('');
  }
  getErrorMessagPassworde() {
    return this.password.hasError('required') ? 'You must enter a value' : this.password.hasError('minlength') ? 'La Password deve essere minimo 5 caratteri' :  this.password.hasError('maxlength') ? 'La Password deve essere massimo 12 caratteri'  : '';
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :  this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit() {
  }

}
