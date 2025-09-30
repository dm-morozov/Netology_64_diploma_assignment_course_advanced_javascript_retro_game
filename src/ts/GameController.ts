import themes from './themes';
import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import Swordsman from './characters/Swordsman';
import PositionedCharacter from './PositionedCharacter';

/**
 * GameController - класс, который отвечает за логику приложения
 * Он создает инстанцию GamePlay и GameStateService,
 * а также добавляет слушателей событий
 * к GamePlay и реагирует на клики/наведение на ячейки
 */

export default class GameController {
  private gamePlay: GamePlay;
  private stateService: GameStateService;

  constructor(gamePlay: GamePlay, stateService: GameStateService) {
    console.log('GameController: Constructor called');
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: добавьте слушателей событий gamePlay
    this.gamePlay.drawUi(themes.prairie);
    // TODO: load saved stated from stateService
    // TODO: загрузить сохраненные данные из stateService

    // Тест: создаём Swordsman и размещаем на поле
    const swordsman = new Swordsman(1);
    const positionedSwordsman = new PositionedCharacter(swordsman, 0); // Позиция 0 (верхний левый угол)
    this.gamePlay.redrawPositions([positionedSwordsman]); // Рисуем на поле

    console.log('GameController: UI drawn');
  }

  onCellClick(_index: number) {
    // TODO: react to click
  }

  onCellEnter(_index: number) {
    // TODO: react to mouse enter
  }

  onCellLeave(_index: number) {
    // TODO: react to mouse leave
  }
}
