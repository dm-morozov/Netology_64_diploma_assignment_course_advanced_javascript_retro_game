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
  protected attack: number = 0;
  protected defence: number = 0;
  public health: number;
  public type: string;

  constructor(level: number, type: string = 'generic') {
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target === Character) {
      throw new Error('Невозможно напрямую создать экземпляр класса Character');
    }
    this.level = 1;
    this.health = 100;
    this.type = type;
    this.attack = 0;
    this.defence = 0;
  }

  /**
   * Повышение уровня — используется только для игроков
   * Логика из задания:
   *  - уровень +1
   *  - здоровье = здоровье + 80 (но не более 100)
   *  - атака/защита пересчитываются по формуле в зависимости от оставшегося здоровья
   */
  levelUp(): void {
    // Сохраняем текущее здоровье для формулы
    const currentHealth = this.health;
    // Увеличиваем уровень
    this.level += 1;
    // Обновляем здоровье по нашей формуле
    this.health = Math.min(this.health + 80, 100);
    // Обновляем атаку и защиту по формуле из задания
    this.attack = Math.max(
      this.attack,
      Math.round((this.attack * (80 + currentHealth)) / 100)
    );
    this.defence = Math.max(
      this.defence,
      Math.round((this.defence * (80 + currentHealth)) / 100)
    );
  }

  /**
   * Установка уровня — используется для врагов при генерации
   * В отличие от levelUp(), НЕ трогает здоровье (остаётся = 100).
   * Просто повышает уровень и линейно усиливает атаку/защиту.
   */
  setLevel(level: number): void {
    if (level < 1) {
      throw new Error('Уровень должен быть >= 1');
    }

    this.level = level;
    this.health = 100; // у врагов всегда 100 при создании

    // Например: +15% к статам за каждый уровень выше первого
    for (let i = 1; i < level; i++) {
      this.attack = Math.round(this.attack * 1.15);
      this.defence = Math.round(this.defence * 1.15);
    }
  }

  // --- геттеры/сеттеры ---

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

  // Сеттеры для тестов
  setAttack(attack: number): void {
    this.attack = attack;
  }

  setDefence(defence: number): void {
    this.defence = defence;
  }
}
