import type { Assertion } from 'vitest';
import { describe, expect, it } from 'vitest';
import { parseUint16 } from './i2c-utils';

describe('I2C Utils', () => {
  describe('parseUint16', () => {
    it('should throw RangeError for invalid uint16 string', () => {
      (
        expect(() => {
          parseUint16('-1');
        }) as Assertion<() => void>
      ).toThrow(RangeError);

      (
        expect(() => {
          parseUint16('65536');
        }) as Assertion<() => void>
      ).toThrow(RangeError);

      (
        expect(() => {
          parseUint16('invalid');
        }) as Assertion<() => void>
      ).toThrow(RangeError);
    });
  });
});
