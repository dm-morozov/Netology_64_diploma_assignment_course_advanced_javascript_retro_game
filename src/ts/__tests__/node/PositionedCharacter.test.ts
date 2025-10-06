// src/ts/__tests__/node/PositionedCharacter.test.ts

import PositionedCharacter from '../../PositionedCharacter';
import Swordsman from '../../characters/Swordsman';
import Character from '../../Character';

describe('PositionedCharacter', () => {
  test('должен создавать экземпляр с корректными параметрами', () => {
    const swordsman = new Swordsman(1);
    const position = 8;
    const positioned = new PositionedCharacter(swordsman, position);
    expect(positioned.character).toBe(swordsman);
    expect(positioned.position).toBe(position);
    expect(positioned.character instanceof Character).toBe(true);
  });

  test('должен выбрасывать ошибку, если character не экземпляр Character', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => new PositionedCharacter({} as any, 8)).toThrow(
      'Первый параметр должен быть экземпляром Character или его дочерними элементами'
    );
  });

  test('должен выбрасывать ошибку, если position не число', () => {
    const swordsman = new Swordsman(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => new PositionedCharacter(swordsman, '8' as any)).toThrow(
      'позиция должна быть числом'
    );
  });
});
