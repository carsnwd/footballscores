import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { GamesService } from './games.service';
import { _ } from '../../node_modules/lodash';

describe('GamesService - ', () => {
  let gamesService: GamesService;
  let httpMock: HttpTestingController;
  let mockNflApiData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GamesService
      ]
    });
    gamesService = TestBed.get(GamesService);
    httpMock = TestBed.get(HttpTestingController);
    mockNflApiData = {
      'w': 14,
      'gms': [{
          'hs': 30,
          'd': 'Thu',
          'gsis': 57759,
          'vs': 9,
          'eid': 2018120600,
          'h': 'TEN',
          'ga': '',
          'rz': -1,
          'v': 'JAX',
          'vnn': 'Jaguars',
          't': '8:20',
          'q': 'F',
          'hnn': 'Titans'
      },
      {
        'hs': 23,
        'd': 'Sun',
        'gsis': 57760,
        'vs': 27,
        'eid': 2018120900,
        'h': 'BUF',
        'ga': '',
        'rz': -1,
        'v': 'NYJ',
        'vnn': 'Jets',
        't': '1:00',
        'q': 'F',
        'hnn': 'Bills'
      }
    ],
    't': 'REG',
    'gd': '1',
    'bph': '95',
    'y': 2018
    };
});

  it('should be created', () => {
    expect(gamesService).toBeTruthy();
  });

  describe('getCurrentGames() - ', () => {
    it('should returns all the current games', (done: DoneFn) => {
      gamesService.getCurrentGames().subscribe((result) => {
        expect(_.size(result)).toEqual(2);
        const resultItem = _.get(result, 'gms')[0];
        expect(resultItem.id).toEqual(2018120600);
        expect(resultItem.day).toEqual('Thu');
        expect(resultItem.startTime).toEqual('8:20');
        expect(resultItem.homeTeam).toEqual('TEN');
        expect(resultItem.awayTeam).toEqual('JAX');
        expect(resultItem.homeScore).toEqual(30);
        expect(resultItem.awayScore).toEqual(9);
        expect(resultItem.quarter).toEqual('F');
        done();
      });

      const nflApiRequest = httpMock.expectOne('http://www.nfl.com/liveupdate/scorestrip/ss.json');
      nflApiRequest.flush({data: mockNflApiData});
      httpMock.verify();
    });

    it('should call console.error when an error', (done: DoneFn) => {
      spyOn(console, 'error');
      gamesService.getCurrentGames().subscribe(() => {
        expect(console.error).toHaveBeenCalledWith('ERROR_TIMEOUT');
        done();
      });

      const nflApiRequest = httpMock.expectOne('http://www.nfl.com/liveupdate/scorestrip/ss.json');
      nflApiRequest.flush(new ErrorEvent('ERROR_TIMEOUT'));
      httpMock.verify();
    });

  });
});
