import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PrenotaComponent} from './prenota/prenota.component';
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./core/auth.guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoginComponent} from "./login/login.component";
import {ModalComponent} from "./login/modal/modal.component";
import {ProfiloComponent} from './profilo/profilo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prenota', component: PrenotaComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'profilo', component: UserProfileComponent , canActivate: [AuthGuard]    },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: ModalComponent  },
  { path: 'profilonew', component: ProfiloComponent , canActivate: [AuthGuard] },



  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
