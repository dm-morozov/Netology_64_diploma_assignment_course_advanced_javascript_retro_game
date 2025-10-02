import themes from './themes';
import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import Swordsman from './characters/Swordsman';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import { generateTeam, generatePositions } from './generators';
import { formatCharacterInfo, calcMoveRange } from './utils';
import cursors from './cursors';

/**
 * GameController - класс, который отвечает за логику приложения
 * Он создает инстанцию GamePlay и GameStateService,
 * а также добавляет слушателей событий
 * к GamePlay и реагирует на клики/наведение на ячейки
 */

export default class GameController {
  private gamePlay: GamePlay;
  private stateService: GameStateService;
  private playerTeam: PositionedCharacter[];
  private enemyTeam: PositionedCharacter[];
  // Новое свойство
  // Изначально персонаж не выбран (null),
  // а после клика это будет объект PositionedCharacter
  private selectedCharacter: PositionedCharacter | null = null;

  constructor(gamePlay: GamePlay, stateService: GameStateService) {
    console.log('GameController: Constructor called');
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playerTeam = [];
    this.enemyTeam = [];
  }

  init() {
    console.log('GameController: Starting init with theme: prairie');
    // TODO: add event listeners to gamePlay events
    // TODO: добавьте слушателей событий gamePlay
    this.gamePlay.drawUi(themes.prairie);

    // Добавляем слушатели событий
    this.gamePlay.addCellEnterListener((index: number) =>
      this.onCellEnter(index)
    );
    this.gamePlay.addCellLeaveListener((index: number) =>
      this.onCellLeave(index)
    );

    this.gamePlay.addCellClickListener((index: number) =>
      this.onCellClick(index)
    );

    // Генерация команд
    const playerTypes = [Swordsman, Bowman, Magician];
    const enemyTypes = [Daemon, Undead, Vampire];
    const playerTeam = generateTeam(playerTypes, 1, 2);
    const enemyTeam = generateTeam(enemyTypes, 1, 2);

    // Позиции для игрока (столбцы 1 и 2: 0, 1, 8, 9, 16, 17, ...),
    // Думаем как сделать))
    const playerPositions = [];
    for (let row = 0; row < 8; row++) {
      playerPositions.push(row * 8, row * 8 + 1);
    }
    console.log(playerPositions);

    // Позиции для врага (столбцы 7 и 8: 6, 7, 14, 15, 22, 23, ...)
    const enemyPositions = [];
    for (let row = 0; row < 8; row++) {
      enemyPositions.push(row * 8 + 6, row * 8 + 7);
    }
    console.log(enemyPositions);

    // Размещение команд
    this.playerTeam = generatePositions(
      playerTeam.getCharacters(),
      playerPositions
    );

    this.enemyTeam = generatePositions(
      enemyTeam.getCharacters(),
      enemyPositions
    );

    // Отрисовка
    this.gamePlay.redrawPositions([...this.playerTeam, ...this.enemyTeam]);
    console.log('GameController: UI drawn');

    // TODO: load saved stated from stateService
    // TODO: загрузить сохраненные данные из stateService

    // Тест: создаём Swordsman и размещаем на поле
    // const swordsman = new Swordsman(1);
    // const positionedSwordsman = new PositionedCharacter(swordsman, 0); // Позиция 0 (верхний левый угол)
    // this.gamePlay.redrawPositions([positionedSwordsman]); // Рисуем на поле
  }

  private getMoveRange(character: PositionedCharacter): number {
    if (
      character.character instanceof Swordsman ||
      character.character instanceof Undead
    ) {
      return 4;
    }
    if (
      character.character instanceof Bowman ||
      character.character instanceof Vampire
    ) {
      return 2;
    }
    if (
      character.character instanceof Magician ||
      character.character instanceof Daemon
    ) {
      return 1;
    }
    return 0; // На случай неизвестного типа
  }

  private getAttackRange(character: PositionedCharacter): number {
    if (
      character.character instanceof Swordsman ||
      character.character instanceof Undead
    ) {
      return 1;
    }
    if (
      character.character instanceof Bowman ||
      character.character instanceof Vampire
    ) {
      return 2;
    }
    if (
      character.character instanceof Magician ||
      character.character instanceof Daemon
    ) {
      return 4;
    }
    return 0;
  }

  // Метод, который вызывается,
  // когда игрок кликает по ячейке
  onCellClick(index: number) {
    // console.log('GameController: Cell clicked');
    const clickedCharacter = [...this.playerTeam, ...this.enemyTeam].find(
      (p) => p.position === index
    );
    if (clickedCharacter) {
      if (this.playerTeam.includes(clickedCharacter)) {
        // console.log('GameController: Кликнули на персонажа игрока');
        // Если уже выбран другой персонаж - снимаем выделение
        if (this.selectedCharacter) {
          this.gamePlay.deselectCell(this.selectedCharacter.position);
        }
        // Выбираем персонажа
        this.selectedCharacter = clickedCharacter;
        // Выделяем персонажа
        this.gamePlay.selectCell(index);
        // Меняет курсор на pointer
        this.gamePlay.setCursor(cursors.pointer);
      } else {
        // Если кликнули на врага — показываем ошибку
        GamePlay.showError('Это персонаж противника! Выберите своего.');
      }
    } else {
      if (this.selectedCharacter) {
        // Если выбран персонаж и кликнули на пустую ячейку
        // Проверяем, можно ли туда пойти

        // Дальность хода
        const moveRange = this.getMoveRange(this.selectedCharacter);
        // Доступные клетки
        const allowedMoves = calcMoveRange(
          this.selectedCharacter.position,
          moveRange
        );

        if (allowedMoves.includes(index)) {
          // Тогда мы перемещаем персонажа
          const oldPosition = this.selectedCharacter.position; // Запоминаем старую позицию
          this.selectedCharacter.position = index; // Обновляем позицию
          this.gamePlay.deselectCell(oldPosition); // Снимаем выделение со старой клетки
          this.selectedCharacter = null; // Сбрасываем выбор
          this.gamePlay.setCursor(cursors.auto); // Возвращаем стандартный курсор
          this.gamePlay.redrawPositions([
            ...this.playerTeam,
            ...this.enemyTeam,
          ]); // Перерисовываем поле
        } else {
          // Если нельзя пойти — показываем ошибку
          GamePlay.showError('Сюда пойти нельзя');
        }
      }
    }
  }

  onCellEnter(index: number) {
    // TODO: show tooltip
    // TODO: показать tooltip
    const character = [...this.playerTeam, ...this.enemyTeam].find(
      (p) => p.position === index
    );
    if (character) {
      // Показываем тултип с характеристиками
      const level = character.character.getLevel();
      const attack = character.character.getAttack();
      const defence = character.character.getDefence();
      const health = character.character.health;
      const message = formatCharacterInfo`🎖${level} ⚔${attack} 🛡${defence} ❤${health}`;
      this.gamePlay.showCellTooltip(message, index);

      // Если персонаж игрока и можно выбрать его
      if (this.selectedCharacter) {
        const attackRange = this.getAttackRange(this.selectedCharacter);
        const allowedAttacks = calcMoveRange(
          this.selectedCharacter.position,
          attackRange
        );
        if (
          this.enemyTeam.includes(character) &&
          allowedAttacks.includes(index)
        ) {
          this.gamePlay.selectCell(index, 'red');
          this.gamePlay.setCursor(cursors.crosshair);
        } else if (this.playerTeam.includes(character)) {
          this.gamePlay.setCursor(cursors.pointer);
        } else {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      } else {
        if (this.playerTeam.includes(character)) {
          this.gamePlay.setCursor(cursors.pointer);
        } else {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      }
    } else {
      if (this.selectedCharacter) {
        const moveRange = this.getMoveRange(this.selectedCharacter);
        const allowedMoves = calcMoveRange(
          this.selectedCharacter.position,
          moveRange
        );
        if (allowedMoves.includes(index)) {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor(cursors.pointer);
        } else {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      } else {
        this.gamePlay.setCursor(cursors.auto);
      }
    }
  }

  onCellLeave(index: number) {
    // TODO: hide tooltip
    // TODO: убрать tooltip
    this.gamePlay.hideCellTooltip(index);
    if (!this.selectedCharacter || this.selectedCharacter.position !== index) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor(cursors.auto);
  }
}
