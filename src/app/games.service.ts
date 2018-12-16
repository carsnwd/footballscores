import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './models/game';
import { Observable } from '../../node_modules/rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})


/**
  * @ngdoc service
  * @name MODULE_NAME.SERVICE_NAME
  *
  * @description
  * Calls the NFL Live Update API to get the current scores, parses them, and returns them in an observable.
  **/
export class GamesService {

  constructor(private http: HttpClient) { }

  /**
   * @method getCurrentGames
   * @returns An observable that returns the parsed games in a Game array.
   */
  public getCurrentGames(): Observable<any> {
    const currentGameObservable = new Observable(observer => {
      this.http.get('http://www.nfl.com/liveupdate/scorestrip/ss.json')
      .subscribe((data) => {
        observer.next(this.parseGames(data));
      }, (error) => {
        observer.error((err) => {console.error('Recieved error: ' + err);
        });
      });
    });

    return currentGameObservable;
  }

  /**
   * @method getCurrentWeek
   * @returns An observable that returns the current week.
   */
  public getCurrentWeek(): Observable<any>{
    const currentWeekObservable = new Observable(observer =>{
      this.http.get('http://www.nfl.com/liveupdate/scorestrip/ss.json')
      .subscribe((data) => {
        observer.next(_.get(data, 'w'));
      }, (error) => {
        observer.error((err) => {
          console.error('Recieved error: ' + err);
        });
      });
    });

    return currentWeekObservable;
  }

  /**
   * @method parseGames
   * @param data - JSON Data from the NFL Live Update API.
   * @returns - Array of Game objects for each game.
   */
  private parseGames(data): Game[] {
    const games: Game[] = [];
    _.forEach(_.get(data, 'gms'), function(game) {
      const gameModel = new Game();
      gameModel.id = _.get(game, 'eid');
      gameModel.homeScore = _.get(game, 'hs');
      gameModel.awayScore = _.get(game, 'vs');
      gameModel.homeTeam = _.get(game, 'h');
      gameModel.awayTeam = _.get(game, 'v');
      gameModel.day = _.get(game, 'd');
      gameModel.startTime = _.get(game, 't');
      gameModel.quarter = _.get(game, 'q');
      games.push(gameModel);
    });
    return games;
  }
}
