import type { Assertion } from 'vitest';
import { describe, expect, it } from 'vitest';
import type {
  I2CSlaveAddress,
  I2CSlaveDevice,
  PortName,
  PortNumber,
} from './i2c-types';

describe('I2C Types', () => {
  it('should have correct PortNumber type', () => {
    const portNumber: PortNumber = 1;
    (expect(typeof portNumber) as Assertion<string>).toBe('number');
  });

  it('should have correct PortName type', () => {
    const portName: PortName = 'i2c-1';
    (expect(typeof portName) as Assertion<string>).toBe('string');
  });

  it('should have correct I2CSlaveAddress type', () => {
    const slaveAddress: I2CSlaveAddress = 0x12;
    (expect(typeof slaveAddress) as Assertion<string>).toBe('number');
  });

  it('should have correct I2CSlaveDevice interface', () => {
    const device: I2CSlaveDevice = {
      slaveAddress: 0x12,
      read8: async () => {
        await Promise.resolve();
        return 0x12;
      },
      read16: async () => {
        await Promise.resolve();
        return 0x1234;
      },
      write8: async (value: number) => {
        await Promise.resolve();
        return value;
      },
      write16: async (value: number) => {
        await Promise.resolve();
        return value;
      },
      readByte: async () => {
        await Promise.resolve();
        return 0x12;
      },
      readBytes: async () => {
        await Promise.resolve();
        return new Uint8Array([0x12, 0x34]);
      },
      writeByte: async (byte: number) => {
        await Promise.resolve();
        return byte;
      },
      writeBytes: async (bytes: Array<number>) => {
        await Promise.resolve();
        return new Uint8Array(bytes);
      },
    };

    (expect(typeof device.read8) as Assertion<string>).toBe('function');
    (expect(typeof device.read16) as Assertion<string>).toBe('function');
    (expect(typeof device.write8) as Assertion<string>).toBe('function');
    (expect(typeof device.write16) as Assertion<string>).toBe('function');
    (expect(typeof device.readByte) as Assertion<string>).toBe('function');
    (expect(typeof device.readBytes) as Assertion<string>).toBe('function');
    (expect(typeof device.writeByte) as Assertion<string>).toBe('function');
    (expect(typeof device.writeBytes) as Assertion<string>).toBe('function');
  });
});
