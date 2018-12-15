export class Game {
    private _id: number;
    private _day: string;
    private _startTime: string;
    private _homeTeam: string;
    private _awayTeam: string;
    private _homeScore: string;
    private _awayScore: string;
    private _quarter: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get day(): string {
        return this._day;
    }
    public set day(value: string) {
        this._day = value;
    }
    public get startTime(): string {
        return this._startTime;
    }
    public set startTime(value: string) {
        this._startTime = value;
    }
    public get homeTeam(): string {
        return this._homeTeam;
    }
    public set homeTeam(value: string) {
        this._homeTeam = value;
    }
    public get awayTeam(): string {
        return this._awayTeam;
    }
    public set awayTeam(value: string) {
        this._awayTeam = value;
    }
    public get homeScore(): string {
        return this._homeScore;
    }
    public set homeScore(value: string) {
        this._homeScore = value;
    }
    public get awayScore(): string {
        return this._awayScore;
    }
    public set awayScore(value: string) {
        this._awayScore = value;
    }
    public get quarter(): string {
        return this._quarter;
    }
    public set quarter(value: string) {
        this._quarter = value;
    }
}
