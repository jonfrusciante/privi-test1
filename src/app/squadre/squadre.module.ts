import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SquadreComponent} from './squadre.component';
import { CreaComponent } from './crea/crea.component';
import { ListComponent } from './list/list.component';
import {RoutingRoutingModule} from './routing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingRoutingModule
  ],
  declarations: [SquadreComponent, CreaComponent, ListComponent]
})
export class SquadreModule { }