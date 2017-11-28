import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-creanuovapartita',
  templateUrl: './creanuovapartita.component.html',
  styleUrls: ['./creanuovapartita.component.css']
})
export class CreanuovapartitaComponent implements OnInit {
  options: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(fb: FormBuilder) {

  }

  ngOnInit() {
  }

}
