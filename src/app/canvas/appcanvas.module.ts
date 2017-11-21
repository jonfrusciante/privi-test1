import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimocanvasComponent} from './primocanvas/primocanvas.component';

@NgModule({
  imports: [ CommonModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [PrimocanvasComponent
  ],
  exports: [ PrimocanvasComponent ],

})
export class AppcanvasModule {

}
