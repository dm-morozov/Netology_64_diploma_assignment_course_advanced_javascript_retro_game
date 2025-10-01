import GameController from '../../GameController';
import GamePlay from '../../GamePlay';
import GameStateService from '../../GameStateService';
import Swordsman from '../../characters/Swordsman';
import Daemon from '../../characters/Daemon';
import PositionedCharacter from '../../PositionedCharacter';
import { formatCharacterInfo } from '../../utils';

describe('GameController', () => {
  let gameController: GameController;
  let gamePlay: GamePlay;
  let stateService: GameStateService;

  beforeEach(() => {
    // Инициализируем GamePlay
    gamePlay = new GamePlay();
    // Мокаем private cells через Object.defineProperty
    Object.defineProperty(gamePlay, 'cells', {
      value: Array(64).fill({ title: '' }),
      writable: true,
    });
    // Мокаем методы, зависящие от DOM
    gamePlay.showCellTooltip = jest.fn();
    gamePlay.hideCellTooltip = jest.fn();
    gamePlay.selectCell = jest.fn();
    gamePlay.deselectCell = jest.fn();
    gamePlay.setCursor = jest.fn();
    GamePlay.showError = jest.fn();

    // Мокаем storage для GameStateService
    const storageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    } as unknown as Storage;
    stateService = new GameStateService(storageMock);
    gameController = new GameController(gamePlay, stateService);
  });

  test('onCellEnter должен показывать tooltip с характеристиками персонажа', () => {
    const swordsman = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(swordsman, 8);
    Object.defineProperty(gameController, 'playerTeam', {
      value: [positionedCharacter],
      writable: true,
    });

    gameController.onCellEnter(8);

    expect(gamePlay.showCellTooltip).toHaveBeenCalledWith(
      formatCharacterInfo`🎖${swordsman.getLevel()} ⚔${swordsman.getAttack()} 🛡${swordsman.getDefence()} ❤${swordsman.health}`,
      8
    );
  });

  test('onCellEnter не должен показывать tooltip для пустой клетки', () => {
    gameController.onCellEnter(0);
    expect(gamePlay.showCellTooltip).not.toHaveBeenCalled();
  });

  test('onCellLeave должен убирать tooltip', () => {
    gameController.onCellLeave(8);
    expect(gamePlay.hideCellTooltip).toHaveBeenCalledWith(8);
  });

  test('onCellClick должен выбирать персонажа игрока и выделять ячейку', () => {
    const swordsman = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(swordsman, 8);
    Object.defineProperty(gameController, 'playerTeam', {
      value: [positionedCharacter],
      writable: true,
    });

    gameController.onCellClick(8);

    expect(gamePlay.selectCell).toHaveBeenCalledWith(8);
    expect(gamePlay.setCursor).toHaveBeenCalledWith('pointer');
    expect(GamePlay.showError).not.toHaveBeenCalled();
    expect(gamePlay.deselectCell).not.toHaveBeenCalled();
  });

  test('onCellClick должен показывать ошибку при клике на врага', () => {
    const daemon = new Daemon(1);
    const positionedCharacter = new PositionedCharacter(daemon, 8);
    Object.defineProperty(gameController, 'enemyTeam', {
      value: [positionedCharacter],
      writable: true,
    });

    gameController.onCellClick(8);

    expect(GamePlay.showError).toHaveBeenCalledWith(
      'Это персонаж противника! Выберите своего.'
    );
    expect(gamePlay.selectCell).not.toHaveBeenCalled();
    expect(gamePlay.setCursor).not.toHaveBeenCalled();
    expect(gamePlay.deselectCell).not.toHaveBeenCalled();
  });

  test('onCellClick должен снимать выделение при клике на пустую ячейку', () => {
    const swordsman = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(swordsman, 8);
    Object.defineProperty(gameController, 'playerTeam', {
      value: [positionedCharacter],
      writable: true,
    });
    Object.defineProperty(gameController, 'selectedCharacter', {
      value: positionedCharacter,
      writable: true,
    });

    gameController.onCellClick(0); // Пустая ячейка

    expect(gamePlay.deselectCell).toHaveBeenCalledWith(8);
    expect(gamePlay.setCursor).toHaveBeenCalledWith('auto');
    expect(gamePlay.selectCell).not.toHaveBeenCalled();
    expect(GamePlay.showError).not.toHaveBeenCalled();
  });

  test('onCellClick должен менять выбор персонажа', () => {
    const swordsman1 = new Swordsman(1);
    const swordsman2 = new Swordsman(1);
    const positionedChar1 = new PositionedCharacter(swordsman1, 8);
    const positionedChar2 = new PositionedCharacter(swordsman2, 16);
    Object.defineProperty(gameController, 'playerTeam', {
      value: [positionedChar1, positionedChar2],
      writable: true,
    });
    Object.defineProperty(gameController, 'selectedCharacter', {
      value: positionedChar1,
      writable: true,
    });

    gameController.onCellClick(16); // Выбираем второго персонажа

    expect(gamePlay.deselectCell).toHaveBeenCalledWith(8);
    expect(gamePlay.selectCell).toHaveBeenCalledWith(16);
    expect(gamePlay.setCursor).toHaveBeenCalledWith('pointer');
    expect(GamePlay.showError).not.toHaveBeenCalled();
  });
});
