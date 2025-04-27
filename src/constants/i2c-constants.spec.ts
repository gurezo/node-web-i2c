import { describe, expect, it } from 'vitest';
import { I2CPortMapSizeMax, Uint16Max } from './i2c-constants';

describe('I2C Constants', () => {
  it('should have correct I2CPortMapSizeMax value', () => {
    expect(I2CPortMapSizeMax).toBe(32);
  });

  it('should have correct Uint16Max value', () => {
    expect(Uint16Max).toBe(65535);
  });
});
