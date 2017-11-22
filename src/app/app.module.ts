import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  DateAdapter, MAT_DATE_FORMATS,
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule,
  MatToolbarModule, MatSlideToggleModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule,
  MatAutocompleteModule, MatSliderModule, MatProgressSpinnerModule, MatCardModule,
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material';
import { ImageCropperModule } from 'ng2-img-cropper/';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CarouselModule } from 'angular4-carousel';
import { PrenotaComponent } from './prenota/prenota.component';
import { HttpClientModule , } from '@angular/common/http';
import {APP_DATE_FORMATS, NativeComponent} from './native/native.component';
import { AdminComponent } from './admin/admin.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AddRangeComponent } from './admin/add-range/add-range.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { CalendarHederComponent } from './admin/calendar/calendar-heder/calendar-heder.component';
import { DialogcalendarComponent } from './calendar/dialogcalendar/dialogcalendar.component';
import { FormdialogComponent } from './calendar/formdialog/formdialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserClassComponent } from './user-profile/user-class.component';
import { FileUploadModule } from 'ng2-file-upload';
import * as  Cloudinary from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import {UserService} from './user-profile/user.service';
import { ModalComponent } from './login/modal/modal.component';
import { ModaltestComponent } from './login/modaltest.component';
import { Modaltest1Component } from './login/modaltest1.component';
import { DayviewerComponent } from './prenota/dayviewer.component';
import { TeamComponent } from './team/team.component';
import { CreaComponent } from './team/crea/crea.component';
import { HometeamComponent } from './team/hometeam/hometeam.component';
// import { PrimocanvasComponent } from './canvas/primocanvas/primocanvas.component';
import { ProfiloComponent } from './profilo/profilo.component';
import {SquadreModule} from './squadre/squadre.module';
import {AppcanvasModule} from './canvas/appcanvas.module';
import {MaterialModule} from './material/material.module';
import { ImgGuruService } from './img-guru.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PrenotaComponent,
    NativeComponent,
    AdminComponent,
    AddRangeComponent,
    UserProfileComponent,
    LoginComponent,
    CalendarComponent,
    CalendarHederComponent,
    DialogcalendarComponent,
    FormdialogComponent,
    UserClassComponent,
    ModalComponent,
    ModaltestComponent,
    Modaltest1Component,
    DayviewerComponent,
    TeamComponent,
    CreaComponent,
   //  PrimocanvasComponent,
    HometeamComponent,
    ProfiloComponent,



  ],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CalendarModule.forRoot() ,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'ginocloud'}) ,
    AngularFirestoreModule,
    SquadreModule ,
    CoreModule ,
    ReactiveFormsModule ,
    HttpModule,
    FlexLayoutModule ,
    FileUploadModule ,
    BrowserAnimationsModule,
    FormsModule ,
    HttpClientModule ,
    MaterialModule ,
    ImageCropperModule ,
    CarouselModule,
    AppcanvasModule ,
    AppRoutingModule
  ],
  providers: [UserService ,
    {
      provide: DateAdapter, useClass : NativeComponent
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS, providers: [ImgGuruService]
    }
  ],
  entryComponents: [DialogcalendarComponent, Modaltest1Component, HometeamComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
