import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-week-games',
  templateUrl: './week-games.component.html',
  styleUrls: ['./week-games.component.less']
})
export class WeekGamesComponent implements OnInit {
  currentGames: Game[];
  currentWeek: String;

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getCurrentGames().subscribe((data) => {
      this.currentGames = data;
    });
    this.gamesService.getCurrentWeek().subscribe((data) => {
      this.currentWeek = data;
    });
  }

}
