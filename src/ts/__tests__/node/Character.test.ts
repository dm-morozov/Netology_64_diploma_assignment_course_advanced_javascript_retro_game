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
    // В setLevel: за каждый уровень выше 1 увеличиваем attack и defence на *1.15
    // Для level=3: дважды *1.15
    // attack: 25 * 1.15 = 28.75, 28.75 * 1.15 ≈ 33.0625 → 33 (округление)
    // defence: 15 * 1.15 = 17.25, 17.25 * 1.15 ≈ 19.8375 → 20 (округление)
    expect(daemon.getAttack()).toBe(33); // Точное значение, так как округление предсказуемо
    expect(daemon.getDefence()).toBe(20); // Точное значение
    expect(daemon.health).toBe(100);
  });

  test('должен создавать врага на уровне 1 без изменений', () => {
    const daemon = new Daemon(1);
    expect(daemon.getAttack()).toBe(25);
    expect(daemon.getDefence()).toBe(15);
  });

  test('levelUp не должен усиливать, если health=0', () => {
    const char = new Swordsman(1);
    char.health = 0;
    char.levelUp();
    expect(char.getAttack()).toBe(40); // Формула даёт меньше, но Math.max берёт текущее
  });

  test('setLevel должен выбрасывать ошибку для level <1', () => {
    const daemon = new Daemon(1);
    expect(() => daemon.setLevel(0)).toThrow('Уровень должен быть >= 1');
  });
});
