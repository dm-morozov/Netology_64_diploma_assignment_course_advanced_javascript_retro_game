import GameController from '../../GameController';
import GamePlay from '../../GamePlay';
import GameStateService from '../../GameStateService';
import PositionedCharacter from '../../PositionedCharacter';
import Swordsman from '../../characters/Swordsman';
import Bowman from '../../characters/Bowman';
import Magician from '../../characters/Magician';
import Undead from '../../characters/Undead';
import Vampire from '../../characters/Vampire';
import Daemon from '../../characters/Daemon';
import cursors from '../../cursors';
import { formatCharacterInfo } from '../../utils';

describe('GameController', () => {
  let gameController: GameController;
  let gamePlay: GamePlay;
  let stateService: GameStateService;
  let showErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // моки методов экземпляра GamePlay
    gamePlay = {
      addCellEnterListener: jest.fn(),
      addCellLeaveListener: jest.fn(),
      addCellClickListener: jest.fn(),
      drawUi: jest.fn(),
      redrawPositions: jest.fn(),
      selectCell: jest.fn(),
      deselectCell: jest.fn(),
      showCellTooltip: jest.fn(),
      hideCellTooltip: jest.fn(),
      setCursor: jest.fn(),
      showError: jest.fn(),
      showDamage: jest.fn().mockResolvedValue(undefined), // Добавляем мок для showDamage
    } as unknown as GamePlay;

    // моки для stateService
    stateService = {
      load: jest.fn(),
      save: jest.fn(),
    } as unknown as GameStateService;

    // подменяем статический метод showError класса GamePlay на шпион
    showErrorSpy = jest
      .spyOn(GamePlay, 'showError')
      .mockImplementation(() => {});

    gameController = new GameController(gamePlay, stateService);
    gameController.init();
  });

  afterEach(() => {
    // восстанавливаем оригинал и чистим все мок-функции
    showErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('должен инициализировать игру и добавлять слушатели событий', () => {
    // drawUi вызывается со строковой темой
    expect(gamePlay.drawUi).toHaveBeenCalledWith(expect.any(String));
    expect(gamePlay.addCellEnterListener).toHaveBeenCalled();
    expect(gamePlay.addCellLeaveListener).toHaveBeenCalled();
    expect(gamePlay.addCellClickListener).toHaveBeenCalled();
    expect(gamePlay.redrawPositions).toHaveBeenCalledWith(expect.any(Array));
  });

  describe('getMoveRange', () => {
    test('должен возвращать 4 для Swordsman', () => {
      const character = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(4);
    });

    test('должен возвращать 2 для Bowman', () => {
      const character = new PositionedCharacter(new Bowman(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(2);
    });

    test('должен возвращать 1 для Magician', () => {
      const character = new PositionedCharacter(new Magician(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(1);
    });

    test('должен возвращать 4 для Undead', () => {
      const character = new PositionedCharacter(new Undead(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(4);
    });

    test('должен возвращать 2 для Vampire', () => {
      const character = new PositionedCharacter(new Vampire(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(2);
    });

    test('должен возвращать 1 для Daemon', () => {
      const character = new PositionedCharacter(new Daemon(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getMoveRange(character)).toBe(1);
    });
  });

  describe('getAttackRange', () => {
    test('должен возвращать 1 для Swordsman', () => {
      const character = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(1);
    });

    test('должен возвращать 2 для Bowman', () => {
      const character = new PositionedCharacter(new Bowman(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(2);
    });

    test('должен возвращать 4 для Magician', () => {
      const character = new PositionedCharacter(new Magician(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(4);
    });

    test('должен возвращать 1 для Undead', () => {
      const character = new PositionedCharacter(new Undead(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(1);
    });

    test('должен возвращать 2 для Vampire', () => {
      const character = new PositionedCharacter(new Vampire(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(2);
    });

    test('должен возвращать 4 для Daemon', () => {
      const character = new PositionedCharacter(new Daemon(1), 0);
      // @ts-expect-error: проверяем приватный метод в тесте
      expect(gameController.getAttackRange(character)).toBe(4);
    });
  });

  describe('onCellEnter', () => {
    test('показывает тултип и pointer для персонажа игрока без выбранного', () => {
      const character = new PositionedCharacter(new Swordsman(1), 10);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      gameController.onCellEnter(10);
      expect(gamePlay.showCellTooltip).toHaveBeenCalledWith(
        formatCharacterInfo`🎖${character.character.getLevel()} ⚔${character.character.getAttack()} 🛡${character.character.getDefence()} ❤${character.character.health}`,
        10
      );
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });

    test('показывает тултип и not-allowed для врага без выбранного персонажа', () => {
      const character = new PositionedCharacter(new Vampire(1), 10);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [character];
      gameController.onCellEnter(10);
      expect(gamePlay.showCellTooltip).toHaveBeenCalledWith(
        formatCharacterInfo`🎖${character.character.getLevel()} ⚔${character.character.getAttack()} 🛡${character.character.getDefence()} ❤${character.character.health}`,
        10
      );
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.notallowed);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });

    test('подсвечивает зелёным и pointer для допустимых клеток движения (Swordsman)', () => {
      const character = new PositionedCharacter(new Swordsman(1), 27);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellEnter(18); // расстояние 3 (в пределах 4)
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает зелёным и pointer для допустимых клеток движения (Bowman)', () => {
      const character = new PositionedCharacter(new Bowman(1), 27);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellEnter(26); // расстояние 1 (в пределах 2)
      expect(gamePlay.selectCell).toHaveBeenCalledWith(26, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает зелёным и pointer для допустимых клеток движения (Magician)', () => {
      const character = new PositionedCharacter(new Magician(1), 27);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellEnter(26); // расстояние 1 (в пределах 1)
      expect(gamePlay.selectCell).toHaveBeenCalledWith(26, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Swordsman)', () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 1); // расстояние 1
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = player;
      gameController.onCellEnter(1);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(1, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Bowman)', () => {
      const player = new PositionedCharacter(new Bowman(1), 27);
      const enemy = new PositionedCharacter(new Vampire(1), 18); // расстояние 2
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = player;
      gameController.onCellEnter(18);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Magician)', () => {
      const player = new PositionedCharacter(new Magician(1), 27);
      const enemy = new PositionedCharacter(new Vampire(1), 18); // расстояние 3
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = player;
      gameController.onCellEnter(18);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('устанавливает not-allowed для врага вне радиуса атаки (Swordsman)', () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 10); // расстояние > 1
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = player;
      gameController.onCellEnter(10);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.notallowed);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });

    test('устанавливает not-allowed для недопустимых клеток движения (Bowman)', () => {
      const character = new PositionedCharacter(new Bowman(1), 27);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellEnter(63); // вне радиуса 2
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.notallowed);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });

    test('устанавливает auto для пустых клеток без выбранного персонажа', () => {
      gameController.onCellEnter(20);
      expect(gamePlay.showCellTooltip).not.toHaveBeenCalled();
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.auto);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });
  });

  describe('onCellClick', () => {
    test('выбирает персонажа игрока при клике', () => {
      const character = new PositionedCharacter(new Swordsman(1), 10);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      gameController.onCellClick(10);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(10);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
      // @ts-expect-error: проверяем приватное поле
      expect(gameController.selectedCharacter).toBe(character);
      expect(GamePlay.showError).not.toHaveBeenCalled();
    });

    test('снимает выделение при выборе другого персонажа игрока', () => {
      const character1 = new PositionedCharacter(new Swordsman(1), 10);
      const character2 = new PositionedCharacter(new Bowman(1), 11);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character1, character2];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character1;
      gameController.onCellClick(11);
      expect(gamePlay.deselectCell).toHaveBeenCalledWith(10);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(11);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
      // @ts-expect-error: проверяем приватное поле
      expect(gameController.selectedCharacter).toBe(character2);
      expect(GamePlay.showError).not.toHaveBeenCalled();
    });

    test('показывает ошибку при клике на врага', () => {
      const character = new PositionedCharacter(new Vampire(1), 10);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.enemyTeam = [character];
      gameController.onCellClick(10);
      expect(GamePlay.showError).toHaveBeenCalledWith(
        'Сначала выберите своего персонажа'
      );
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
      expect(gamePlay.setCursor).not.toHaveBeenCalledWith(cursors.pointer);
      expect(gamePlay.deselectCell).not.toHaveBeenCalled();
    });
  });

  describe('onCellLeave', () => {
    test('убирает тултип и снимает выделение', () => {
      const character = new PositionedCharacter(new Swordsman(1), 8);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellLeave(9); // не выбранный персонаж
      expect(gamePlay.hideCellTooltip).toHaveBeenCalledWith(9);
      expect(gamePlay.deselectCell).toHaveBeenCalledWith(9);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.auto);
    });

    test('не снимает выделение с выбранного персонажа', () => {
      const character = new PositionedCharacter(new Swordsman(1), 8);
      // @ts-expect-error: подмена приватного поля для теста
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля для теста
      gameController.selectedCharacter = character;
      gameController.onCellLeave(8); // выбранный персонаж
      expect(gamePlay.hideCellTooltip).toHaveBeenCalledWith(8);
      expect(gamePlay.deselectCell).not.toHaveBeenCalled();
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.auto);
    });
  });
});
