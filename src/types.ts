export type PlayerType = {
	name: string,
	totalScore: number,
	currentScore: number,
	id: string,
	isPlaying : boolean,
}

export type GameType = {
	time: string
	date: string;
	rounds: number;
	score: PlayerType[];
}

export type StateType = {
	players: PlayerType[],
	playersScoreSorted: PlayerType[];
	currentPlayer: number,
	isMenuOpen: boolean,
	isPreviousGamesOpen: boolean;
	isWinner: boolean,
	isAddPlayersOpen: boolean,
	isRoundFinished: boolean,
	scoreGoal: number,
	winner: PlayerType[],
	rounds: number;
	previousGames: GameType[];

}