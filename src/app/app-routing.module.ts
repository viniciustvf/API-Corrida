import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { UserComponent } from './user/components/user/user.component';
import { CountryComponent } from './country/components/country/country.component';
import { TrackComponent } from './track/components/track/track.component';
import { ChampionshipComponent } from './championship/components/championship/championship.component';
import { LoginComponent } from './login/components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: 'track', component: TrackComponent, canActivate: [AuthGuard] },
  {
    path: 'championship',
    component: ChampionshipComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
