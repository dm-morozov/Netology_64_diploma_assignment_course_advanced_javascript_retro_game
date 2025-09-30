import { calcHealthLevel, calcTileType } from './utils';
import PositionedCharacter from './PositionedCharacter';

console.log('GamePlay: Loaded');

export default class GamePlay {
  private boardSize: number = 8;
  private container: HTMLElement | null = null;
  private boardEl: HTMLElement | null = null;
  private cells: HTMLElement[] = [];
  private cellClickListeners: Array<(index: number) => void> = [];
  private cellEnterListeners: Array<(index: number) => void> = [];
  private cellLeaveListeners: Array<(index: number) => void> = [];
  private newGameListeners: Array<() => void> = [];
  private saveGameListeners: Array<() => void> = [];
  private loadGameListeners: Array<() => void> = [];
  private newGameEl: HTMLElement | null = null;
  private saveGameEl: HTMLElement | null = null;
  private loadGameEl: HTMLElement | null = null;

  constructor() {
    console.log('GamePlay: Constructor called');
  }

  bindToDOM(container: HTMLElement) {
    console.log('GamePlay: bindToDOM вызывается с контейнером:', container);
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi(theme: string) {
    console.log('GamePlay: drawUi вызывается с темой:', theme);
    this.checkBinding();

    if (!this.container) {
      throw new Error('Контейнер не найден');
    }

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
        <button data-id="action-save" class="btn">Save Game</button>
        <button data-id="action-load" class="btn">Load Game</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.saveGameEl = this.container.querySelector('[data-id=action-save]');
    this.loadGameEl = this.container.querySelector('[data-id=action-load]');

    if (this.newGameEl) {
      this.newGameEl.addEventListener('click', (_event: Event) =>
        this.onNewGameClick()
      );
    }
    if (this.saveGameEl) {
      this.saveGameEl.addEventListener('click', (_event: Event) =>
        this.onSaveGameClick()
      );
    }
    if (this.loadGameEl) {
      this.loadGameEl.addEventListener('click', (_event: Event) =>
        this.onLoadGameClick()
      );
    }

    this.boardEl = this.container.querySelector('[data-id=board]');
    if (this.boardEl) {
      this.boardEl.classList.add(theme);
    }

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add(
        'cell',
        'map-tile',
        `map-tile-${calcTileType(i, this.boardSize)}`
      );
      cellEl.addEventListener('mouseenter', (event: MouseEvent) =>
        this.onCellEnter(event)
      );
      cellEl.addEventListener('mouseleave', (event: MouseEvent) =>
        this.onCellLeave(event)
      );
      cellEl.addEventListener('click', (event: MouseEvent) =>
        this.onCellClick(event)
      );
      if (this.boardEl) {
        this.boardEl.appendChild(cellEl);
      }
    }

    if (this.boardEl) {
      this.cells = Array.from(this.boardEl.children) as HTMLElement[];
    }
  }

  redrawPositions(positions: PositionedCharacter[]) {
    for (const cell of this.cells) {
      cell.innerHTML = '';
    }

    for (const position of positions) {
      const cellEl = this.boardEl?.children[position.position];
      if (cellEl) {
        const charEl = document.createElement('div');
        charEl.classList.add('character', position.character.type);

        const healthEl = document.createElement('div');
        healthEl.classList.add('health-level');

        const healthIndicatorEl = document.createElement('div');
        healthIndicatorEl.classList.add(
          'health-level-indicator',
          `health-level-indicator-${calcHealthLevel(position.character.health)}`
        );
        healthIndicatorEl.style.width = `${position.character.health}%`;
        healthEl.appendChild(healthIndicatorEl);

        charEl.appendChild(healthEl);
        cellEl.appendChild(charEl);
      }
    }
  }

  addCellEnterListener(callback: (index: number) => void) {
    this.cellEnterListeners.push(callback);
  }

  addCellLeaveListener(callback: (index: number) => void) {
    this.cellLeaveListeners.push(callback);
  }

  addCellClickListener(callback: (index: number) => void) {
    this.cellClickListeners.push(callback);
  }

  addNewGameListener(callback: () => void) {
    this.newGameListeners.push(callback);
  }

  addSaveGameListener(callback: () => void) {
    this.saveGameListeners.push(callback);
  }

  addLoadGameListener(callback: () => void) {
    this.loadGameListeners.push(callback);
  }

  onCellEnter(event: MouseEvent) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget as HTMLElement);
    this.cellEnterListeners.forEach((callback) => callback(index));
  }

  onCellLeave(event: MouseEvent) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget as HTMLElement);
    this.cellLeaveListeners.forEach((callback) => callback(index));
  }

  onCellClick(event: MouseEvent) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget as HTMLElement);
    this.cellClickListeners.forEach((callback) => callback(index));
  }

  onNewGameClick() {
    this.newGameListeners.forEach((callback) => callback());
  }

  onSaveGameClick() {
    this.saveGameListeners.forEach((callback) => callback());
  }

  onLoadGameClick() {
    this.loadGameListeners.forEach((callback) => callback());
  }

  static showError(message: string) {
    alert(message);
  }

  static showMessage(message: string) {
    alert(message);
  }

  selectCell(index: number, color: string = 'yellow') {
    this.deselectCell(index);
    this.cells[index].classList.add('selected', `selected-${color}`);
  }

  deselectCell(index: number) {
    const cell = this.cells[index];
    cell.classList.remove(
      ...Array.from(cell.classList).filter((o) => o.startsWith('selected'))
    );
  }

  showCellTooltip(message: string, index: number) {
    this.cells[index].title = message;
  }

  hideCellTooltip(index: number) {
    this.cells[index].title = '';
  }

  showDamage(index: number, damage: number): Promise<void> {
    return new Promise((resolve) => {
      const cell = this.cells[index];
      const damageEl = document.createElement('span');
      damageEl.textContent = String(damage);
      damageEl.classList.add('damage');
      cell.appendChild(damageEl);

      damageEl.addEventListener('animationend', () => {
        cell.removeChild(damageEl);
        resolve();
      });
    });
  }

  setCursor(cursor: string) {
    if (this.boardEl) {
      this.boardEl.style.cursor = cursor;
    }
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
