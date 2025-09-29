import themes from "./themes";
import GamePlay from "./GamePlay";
import GameStateService from "./GameStateService";

export default class GameController {
  private gamePlay: GamePlay;
  private stateService: GameStateService;

  constructor(gamePlay: GamePlay, stateService: GameStateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: добавьте слушателей событий gamePlay
    this.gamePlay.drawUi(themes.prairie);
    // TODO: load saved stated from stateService
    // TODO: загрузить сохраненные данные из stateService
  }

  onCellClick(index: number) {
    // TODO: react to click
  }

  onCellEnter(index: number) {
    // TODO: react to mouse enter
  }

  onCellLeave(index: number) {
    // TODO: react to mouse leave
  }
}
