import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesService } from './games.service';
import { WeekGamesComponent } from './week-games/week-games.component';

@NgModule({
  declarations: [
    AppComponent,
    WeekGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent, WeekGamesComponent]
})
export class AppModule { }
