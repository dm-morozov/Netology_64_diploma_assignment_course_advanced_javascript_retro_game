// src/ts/__tests__/node/Character.test.ts
import Character from '../../Character';
import Daemon from '../../characters/Daemon';
import Swordsman from '../../characters/Swordsman';

describe('Character', () => {
  test('выбросите исключение, если кто-то использует "new Character()"', () => {
    expect(() => new Character(1)).toThrow(
      'Невозможно напрямую создать экземпляр класса Character'
    );
  });

  test('должны позволять инстанцировать подклассы', () => {
    const swordsman = new Swordsman(1);
    expect(swordsman.type).toBe('swordsman');
    expect(swordsman.getLevel()).toBe(1);
    expect(swordsman.getAttack()).toBe(40);
    expect(swordsman.getDefence()).toBe(10);
    expect(swordsman.health).toBe(100);
  });

  test('должен повысить уровень и характеристики', () => {
    const char = new Swordsman(1);
    char.health = 50;
    char.levelUp();
    expect(char.getLevel()).toBe(2);
    expect(char.health).toBe(100);
    expect(char.getAttack()).toBe(52); // 40 * (80 + 50) / 100 = 52
    expect(char.getDefence()).toBe(13); // 10 * (80 + 50) / 100 = 13
  });

  test('должен создавать персонажа выше 1 уровня с повышением характеристик', () => {
    const daemon = new Daemon(3); // Уровень 3
    expect(daemon.getLevel()).toBe(3);
    // Базово для Daemon: attack=25, defence=15, health=100
    // После 1 levelUp: attack = max(25, 25*(80+100)/100)=45
    // defence = max(15, 15*(80+100)/100)=27, health=100 (уже max)
    // После 2 levelUp: attack = max(45, 45*(80+100)/100)=81
    // defence = max(27, 27*(80+100)/100)=48.6
    expect(daemon.getAttack()).toBeCloseTo(81, 1);
    expect(daemon.getDefence()).toBeCloseTo(48.6, 1);
    expect(daemon.health).toBe(100);
  });
});
