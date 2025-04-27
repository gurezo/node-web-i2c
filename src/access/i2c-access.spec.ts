import { describe, expect, it } from 'vitest';
import { I2CPortMap } from '../ports/i2c-port-map';
import { I2CAccess } from './i2c-access';

describe('I2CAccess', () => {
  it('should create an instance with default ports', () => {
    const access = new I2CAccess();
    expect(access.ports).toBeInstanceOf(I2CPortMap);
  });

  it('should create an instance with custom ports', () => {
    const ports = new I2CPortMap();
    const access = new I2CAccess(ports);
    expect(access.ports).toBe(ports);
  });
});
