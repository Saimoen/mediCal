import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DataUserGuard } from './shared/guards/data-user.guard';
import { SuccessComponent } from './shared/components/success/success.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DataUserGuard],
    component: HomeComponent
  },
  {
    path: 'connexion',
    canActivate: [DataUserGuard],
    component: ConnexionComponent,
  },
  {
    path: 'inscription',
    canActivate: [DataUserGuard],
    component: InscriptionComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'profil',
    canActivate: [DataUserGuard, AuthGuard],
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
