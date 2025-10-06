// src/ts/GameState.ts

// Сначала определяем интерфейс для данных одной позиции (PositionedCharacterData)
// Это типизация для объектов в массивах playerTeamData и enemyTeamData
export interface PositionedCharacterData {
  character: {
    type: string; // Тип персонажа, например 'swordsman'
    level: number; // Уровень
    health: number; // Здоровье
    attack: number; // Атака
    defence: number; // Защита
  };
  position: number; // Позиция на поле (число от 0 до 63)
}

// Теперь класс GameState
export default class GameState {
  // Свойства класса (protected, чтобы их можно было читать, но не менять напрямую)
  protected level: number;
  protected maxScore: number;
  protected playerTeamData: PositionedCharacterData[];
  protected enemyTeamData: PositionedCharacterData[];

  // Конструктор: принимает объект с данными и присваивает их свойствам
  // Объяснение: Если данных нет, устанавливаем дефолтные значения (начало новой игры)
  constructor(data: {
    level: number;
    maxScore: number;
    playerTeamData: PositionedCharacterData[];
    enemyTeamData: PositionedCharacterData[];
  }) {
    this.level = data.level || 1; // Дефолт: уровень 1
    this.maxScore = data.maxScore || 0; // Дефолт: рекорд 0
    this.playerTeamData = data.playerTeamData || []; // Дефолт: пустая команда
    this.enemyTeamData = data.enemyTeamData || []; // Дефолт: пустая команда
  }

  // Метод getStateData(): возвращает объект с текущими данными
  // Объяснение: Это нужно для сохранения — мы передаём этот объект в stateService.save()
  getStateData(): {
    level: number;
    maxScore: number;
    playerTeamData: PositionedCharacterData[];
    enemyTeamData: PositionedCharacterData[];
  } {
    return {
      level: this.level,
      maxScore: this.maxScore,
      playerTeamData: this.playerTeamData,
      enemyTeamData: this.enemyTeamData,
    };
  }

  // Статический метод from(object): создаёт новый экземпляр GameState из переданного объекта
  // Объяснение: Это для восстановления из localStorage. Мы берём объект (из load()) и создаём GameState.
  // Если объект неверный, конструктор установит дефолты, но load() бросит ошибку раньше.
  static from(object: {
    level: number;
    maxScore: number;
    playerTeamData: PositionedCharacterData[];
    enemyTeamData: PositionedCharacterData[];
  }): GameState {
    // Просто передаём объект в конструктор
    return new GameState(object);
  }
}
