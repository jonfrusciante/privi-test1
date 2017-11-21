import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SquadreComponent} from './squadre.component';
import { CreaComponent } from './crea/crea.component';
import {RoutingRoutingModule} from './routing-routing.module';
import { SquadreService } from '../squadre.service';
import {ListComponent} from './list/list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppcanvasModule} from '../canvas/appcanvas.module';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerComponent } from './list/player.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppcanvasModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SquadreComponent, CreaComponent, ListComponent, PlayerComponent],
  providers: [SquadreService]
})
export class SquadreModule {

}
