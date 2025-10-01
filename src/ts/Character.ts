// src/ts/Character.ts

/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  protected level: number;
  protected attack: number;
  protected defence: number;
  public health: number;
  public type: string;

  constructor(level: number, type: string = 'generic') {
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target === Character) {
      throw new Error('Невозможно напрямую создать экземпляр класса Character');
    }
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;
  }

  // Геттеры для protected свойств,
  // чтобы можно было получить значения в тестах
  getLevel(): number {
    return this.level;
  }

  getAttack(): number {
    return this.attack;
  }

  getDefence(): number {
    return this.defence;
  }
}
