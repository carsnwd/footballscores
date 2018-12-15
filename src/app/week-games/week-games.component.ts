import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-week-games',
  templateUrl: './week-games.component.html',
  styleUrls: ['./week-games.component.less']
})
export class WeekGamesComponent implements OnInit {
  currentGames: any;

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getCurrentGames().subscribe((data) => {
      this.currentGames = data;
    });
  }

}
