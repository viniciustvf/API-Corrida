import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { TrackModule } from './track/track.module';
import { ChampionshipModule } from './championship/championship.module';
import { LoginModule } from './login/login.module';
import { AuthService } from './login/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenuModule,
    HomeModule,
    UserModule,
    CountryModule,
    TrackModule,
    ChampionshipModule,
    LoginModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
