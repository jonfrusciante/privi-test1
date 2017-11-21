import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule ,
    MatNativeDateModule ,
    MatAutocompleteModule,
    MatFormFieldModule  ,
    MatSliderModule,
    MatTabsModule ,
    MatCardModule ,
    MatSelectModule ,
    MatInputModule,
    MatSlideToggleModule ,
    MatButtonModule,
    MatCheckboxModule ,
    MatDatepickerModule ,
    MatMenuModule ,
    MatIconModule ,
    MatToolbarModule,
    MatGridListModule,
  ],
  declarations: [],
  exports: [
    MatProgressSpinnerModule ,
    MatNativeDateModule ,
    MatAutocompleteModule,
    MatFormFieldModule  ,
    MatSliderModule,
    MatTabsModule ,
    MatCardModule ,
    MatSelectModule ,
    MatInputModule,
    MatSlideToggleModule ,
    MatButtonModule,
    MatCheckboxModule ,
    MatDatepickerModule ,
    MatMenuModule ,
    MatIconModule ,
    MatToolbarModule,
    MatGridListModule,
  ]
})
export class MaterialModule { }
