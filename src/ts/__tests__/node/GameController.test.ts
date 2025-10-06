// src/ts/__tests__/node/GameController.test.ts
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
  let showMessageSpy: jest.SpyInstance;
  let saveGameCallback: () => void;
  let loadGameCallback: () => void;

  beforeEach(() => {
    // Моки методов экземпляра GamePlay
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
      showDamage: jest.fn().mockResolvedValue(undefined),
      addNewGameListener: jest.fn(),
      addSaveGameListener: jest.fn((callback) => (saveGameCallback = callback)),
      addLoadGameListener: jest.fn((callback) => (loadGameCallback = callback)),
      blockGame: jest.fn(),
      unblockGame: jest.fn(),
    } as unknown as GamePlay;

    // Моки для stateService, включая storage
    stateService = {
      load: jest.fn().mockReturnValue({}),
      save: jest.fn(),
      storage: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
    } as unknown as GameStateService;

    // Подменяем статические методы GamePlay
    showErrorSpy = jest
      .spyOn(GamePlay, 'showError')
      .mockImplementation(() => {});
    showMessageSpy = jest
      .spyOn(GamePlay, 'showMessage')
      .mockImplementation(() => {});

    gameController = new GameController(gamePlay, stateService);
    gameController.init();
  });

  afterEach(() => {
    showErrorSpy.mockRestore();
    showMessageSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('должен инициализировать игру и добавлять слушатели событий', () => {
    expect(gamePlay.drawUi).toHaveBeenCalledWith(expect.any(String));
    expect(gamePlay.addCellEnterListener).toHaveBeenCalled();
    expect(gamePlay.addCellLeaveListener).toHaveBeenCalled();
    expect(gamePlay.addCellClickListener).toHaveBeenCalled();
    expect(gamePlay.addNewGameListener).toHaveBeenCalled();
    expect(gamePlay.addSaveGameListener).toHaveBeenCalled();
    expect(gamePlay.addLoadGameListener).toHaveBeenCalled();
    expect(gamePlay.redrawPositions).toHaveBeenCalledWith(expect.any(Array));
    expect(stateService.storage.getItem).toHaveBeenCalledWith('GameScore');
  });

  describe('getMoveRange', () => {
    test('должен возвращать 4 для Swordsman', () => {
      const character = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(4);
    });

    test('должен возвращать 2 для Bowman', () => {
      const character = new PositionedCharacter(new Bowman(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(2);
    });

    test('должен возвращать 1 для Magician', () => {
      const character = new PositionedCharacter(new Magician(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(1);
    });

    test('должен возвращать 4 для Undead', () => {
      const character = new PositionedCharacter(new Undead(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(4);
    });

    test('должен возвращать 2 для Vampire', () => {
      const character = new PositionedCharacter(new Vampire(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(2);
    });

    test('должен возвращать 1 для Daemon', () => {
      const character = new PositionedCharacter(new Daemon(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getMoveRange(character)).toBe(1);
    });
  });

  describe('getAttackRange', () => {
    test('должен возвращать 1 для Swordsman', () => {
      const character = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(1);
    });

    test('должен возвращать 2 для Bowman', () => {
      const character = new PositionedCharacter(new Bowman(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(2);
    });

    test('должен возвращать 4 для Magician', () => {
      const character = new PositionedCharacter(new Magician(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(4);
    });

    test('должен возвращать 1 для Undead', () => {
      const character = new PositionedCharacter(new Undead(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(1);
    });

    test('должен возвращать 2 для Vampire', () => {
      const character = new PositionedCharacter(new Vampire(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(2);
    });

    test('должен возвращать 4 для Daemon', () => {
      const character = new PositionedCharacter(new Daemon(1), 0);
      // @ts-expect-error: проверяем приватный метод
      expect(gameController.getAttackRange(character)).toBe(4);
    });
  });

  describe('onCellEnter', () => {
    test('показывает тултип и pointer для персонажа игрока без выбранного', () => {
      const character = new PositionedCharacter(new Swordsman(1), 10);
      // @ts-expect-error: подмена приватного поля
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
      // @ts-expect-error: подмена приватного поля
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
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellEnter(18);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает зелёным и pointer для допустимых клеток движения (Bowman)', () => {
      const character = new PositionedCharacter(new Bowman(1), 27);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellEnter(26);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(26, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает зелёным и pointer для допустимых клеток движения (Magician)', () => {
      const character = new PositionedCharacter(new Magician(1), 27);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellEnter(26);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(26, 'green');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Swordsman)', () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 1);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      gameController.onCellEnter(1);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(1, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Bowman)', () => {
      const player = new PositionedCharacter(new Bowman(1), 27);
      const enemy = new PositionedCharacter(new Vampire(1), 18);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      gameController.onCellEnter(18);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('подсвечивает красным и crosshair для врага в радиусе атаки (Magician)', () => {
      const player = new PositionedCharacter(new Magician(1), 27);
      const enemy = new PositionedCharacter(new Vampire(1), 18);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      gameController.onCellEnter(18);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(18, 'red');
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.crosshair);
    });

    test('устанавливает not-allowed для врага вне радиуса атаки (Swordsman)', () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 10);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      gameController.onCellEnter(10);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.notallowed);
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
    });

    test('устанавливает not-allowed для недопустимых клеток движения (Bowman)', () => {
      const character = new PositionedCharacter(new Bowman(1), 27);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellEnter(63);
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
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      gameController.onCellClick(10);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(10);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
      // @ts-expect-error: проверяем приватное поле
      expect(gameController.selectedCharacter).toBe(character);
      expect(showErrorSpy).not.toHaveBeenCalled();
    });

    test('снимает выделение при выборе другого персонажа игрока', () => {
      const character1 = new PositionedCharacter(new Swordsman(1), 10);
      const character2 = new PositionedCharacter(new Bowman(1), 11);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character1, character2];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character1;
      gameController.onCellClick(11);
      expect(gamePlay.deselectCell).toHaveBeenCalledWith(10);
      expect(gamePlay.selectCell).toHaveBeenCalledWith(11);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.pointer);
      // @ts-expect-error: проверяем приватное поле
      expect(gameController.selectedCharacter).toBe(character2);
      expect(showErrorSpy).not.toHaveBeenCalled();
    });

    test('показывает ошибку при клике на врага', () => {
      const character = new PositionedCharacter(new Vampire(1), 10);
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [character];
      gameController.onCellClick(10);
      expect(showErrorSpy).toHaveBeenCalledWith(
        'Сначала выберите своего персонажа'
      );
      expect(gamePlay.selectCell).not.toHaveBeenCalled();
      expect(gamePlay.setCursor).not.toHaveBeenCalledWith(cursors.pointer);
      expect(gamePlay.deselectCell).not.toHaveBeenCalled();
    });

    test('игрок перемещается на допустимую клетку и вызывает ход врага', async () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 10);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      await gameController.onCellClick(8);
      expect(player.position).toBe(8);
      expect(gamePlay.redrawPositions).toHaveBeenCalledTimes(3);
    });

    test('игрок атакует врага в радиусе атаки', async () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      const enemy = new PositionedCharacter(new Vampire(1), 1);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      await gameController.onCellClick(1);
      expect(gamePlay.showDamage).toHaveBeenCalled();
      expect(enemy.character.health).toBeLessThan(100);
    });
  });

  describe('onCellLeave', () => {
    test('убирает тултип и снимает выделение', () => {
      const character = new PositionedCharacter(new Swordsman(1), 8);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellLeave(9);
      expect(gamePlay.hideCellTooltip).toHaveBeenCalledWith(9);
      expect(gamePlay.deselectCell).toHaveBeenCalledWith(9);
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.auto);
    });

    test('не снимает выделение с выбранного персонажа', () => {
      const character = new PositionedCharacter(new Swordsman(1), 8);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [character];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = character;
      gameController.onCellLeave(8);
      expect(gamePlay.hideCellTooltip).toHaveBeenCalledWith(8);
      expect(gamePlay.deselectCell).not.toHaveBeenCalled();
      expect(gamePlay.setCursor).toHaveBeenCalledWith(cursors.auto);
    });
  });

  describe('handleGameOver', () => {
    test('показывает сообщение о победе, если враги побеждены', async () => {
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [
        new PositionedCharacter(new Swordsman(1), 0),
      ];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [];
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      // @ts-expect-error: проверяем приватный метод
      await gameController.handleGameOver();
      expect(showMessageSpy).toHaveBeenCalledWith('Новый рекорд: 100!');
      expect(showMessageSpy).toHaveBeenCalledWith(
        'Игра окончена. Ваш счет: 100. Рекорд: 100.'
      );
      expect(gamePlay.blockGame).toHaveBeenCalled();
    });

    test('показывает сообщение о поражении, если игрок побеждён', async () => {
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [new PositionedCharacter(new Vampire(1), 10)];
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      // @ts-expect-error: проверяем приватный метод
      await gameController.handleGameOver();
      expect(showMessageSpy).toHaveBeenCalledWith(
        'Игра окончена. Ваш счет: 0. Рекорд: 0.'
      );
      expect(gamePlay.blockGame).toHaveBeenCalled();
    });
  });

  describe('score handling', () => {
    test('увеличивает maxScore после победы', async () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [];
      // @ts-expect-error: подмена приватного поля
      gameController.selectedCharacter = player;
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      // @ts-expect-error: подмена приватного поля
      gameController.maxScore = 0;
      // @ts-expect-error: проверяем приватный метод
      await gameController.handleGameOver();
      // @ts-expect-error: проверяем приватное поле
      expect(gameController.maxScore).toBeGreaterThan(0);
    });
  });

  describe('startNewLevel', () => {
    test('переходит на уровень 2 с темой prairie', async () => {
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [
        new PositionedCharacter(new Swordsman(1), 0),
      ];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [];
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      // @ts-expect-error: проверяем приватный метод
      await gameController.startNewLevel();
      expect(gamePlay.drawUi).toHaveBeenCalledWith('prairie');
      expect(gamePlay.redrawPositions).toHaveBeenCalledWith(expect.any(Array));
    });
  });

  describe('saveGameState and loadGameState', () => {
    test('сохраняет и загружает состояние игры', async () => {
      const player = new PositionedCharacter(new Swordsman(1), 0);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [new PositionedCharacter(new Vampire(1), 10)];
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'player';
      saveGameCallback(); // Вызываем слушатель для сохранения
      expect(stateService.save).toHaveBeenCalled();
      expect(showMessageSpy).toHaveBeenCalledWith('Игра успешно сохранена!');

      (stateService.load as jest.Mock).mockReturnValue({
        level: 1,
        maxScore: 100,
        playerTeamData: [
          {
            character: {
              type: 'swordsman',
              level: 1,
              health: 100,
              attack: 40,
              defence: 10,
            },
            position: 0,
          },
        ],
        enemyTeamData: [
          {
            character: {
              type: 'vampire',
              level: 1,
              health: 100,
              attack: 25,
              defence: 25,
            },
            position: 10,
          },
        ],
      });
      loadGameCallback(); // Вызываем слушатель для загрузки
      expect(gamePlay.redrawPositions).toHaveBeenCalled();
      expect(gamePlay.unblockGame).toHaveBeenCalled();
      expect(showMessageSpy).toHaveBeenCalledWith('Игра успешно загружена!');
    });
  });

  describe('makeEnemyTurn', () => {
    test('враг атакует игрока в радиусе атаки', async () => {
      const player = new PositionedCharacter(new Swordsman(1), 1);
      const enemy = new PositionedCharacter(new Vampire(1), 0);
      // @ts-expect-error: подмена приватного поля
      gameController.playerTeam = [player];
      // @ts-expect-error: подмена приватного поля
      gameController.enemyTeam = [enemy];
      // @ts-expect-error: подмена приватного поля
      gameController.activePlayer = 'enemy'; // Ход врага
      // @ts-expect-error: проверяем приватный метод
      await gameController.makeEnemyTurn();
      expect(gamePlay.showDamage).toHaveBeenCalled();
      expect(player.character.health).toBeLessThan(100);
    });
  });
});
