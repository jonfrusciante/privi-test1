import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrenotazioniService} from "../prenotazioni.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PrenotazioniService
  ]
})
export class SharedModule { }
