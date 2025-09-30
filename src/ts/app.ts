import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';

console.log('app.ts: Starting');

const gamePlay = new GamePlay();
console.log('app.ts: GamePlay created');

const container = document.querySelector('#game-container');
if (!container) {
  throw new Error('Game container not found');
}
gamePlay.bindToDOM(container as HTMLElement);
console.log('app.ts: GamePlay bound to DOM');

const stateService = new GameStateService(localStorage);
console.log('app.ts: GameStateService created');

const gameCtrl = new GameController(gamePlay, stateService);
console.log('app.ts: GameController created');

gameCtrl.init();
console.log('app.ts: Initialized');
