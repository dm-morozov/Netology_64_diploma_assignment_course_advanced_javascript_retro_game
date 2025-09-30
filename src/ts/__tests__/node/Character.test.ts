import Character from '../../Character';
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
});
