import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SquadreComponent} from './squadre.component';
import { CreaComponent } from './crea/crea.component';
import {RoutingRoutingModule} from './routing-routing.module';
import { SquadreService } from '../squadre.service';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule
} from '@angular/material';
import {ListComponent} from './list/list.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RoutingRoutingModule, MatFormFieldModule ,
    MatInputModule ,
    MatButtonModule ,
    MatCheckboxModule ,
    MatMenuModule ,
    MatIconModule ,
    MatAutocompleteModule ,
    MatCardModule ,
    FlexLayoutModule ,
  ],
  declarations: [SquadreComponent, CreaComponent, ListComponent],
  providers: [SquadreService]
})
export class SquadreModule { }
