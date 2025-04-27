import { openPromisified } from 'i2c-bus';
import { describe, expect, it, vi } from 'vitest';
import { OperationError } from '../errors/operation-error';
import { I2CPort } from './i2c-port';

// i2c-bus のモック
vi.mock('i2c-bus', () => ({
  openPromisified: vi.fn().mockResolvedValue({
    readByte: vi.fn().mockResolvedValue(0x12),
    readWord: vi.fn().mockResolvedValue(0x1234),
    writeByte: vi.fn().mockResolvedValue(undefined),
    writeWord: vi.fn().mockResolvedValue(undefined),
    receiveByte: vi.fn().mockResolvedValue(0x12),
    i2cRead: vi.fn().mockResolvedValue({
      bytesRead: 2,
      buffer: Buffer.from([0x12, 0x34]),
    }),
    sendByte: vi.fn().mockResolvedValue(undefined),
    i2cWrite: vi.fn().mockResolvedValue({
      bytesWritten: 2,
      buffer: Buffer.from([0x12, 0x34]),
    }),
  }),
}));

describe('I2CPort', () => {
  it('should create an instance with port number', () => {
    const port = new I2CPort(1);
    expect(port.portNumber).toBe(1);
    expect(port.portName).toBe('i2c-1');
  });

  it('should throw error for invalid port number', () => {
    expect(() => new I2CPort(-1)).toThrow(RangeError);
    expect(() => new I2CPort(65536)).toThrow(RangeError);
  });

  describe('open', () => {
    it('should open I2C slave device', async () => {
      const port = new I2CPort(1);
      const device = await port.open(0x12);

      expect(device.slaveAddress).toBe(0x12);
      expect(typeof device.read8).toBe('function');
      expect(typeof device.read16).toBe('function');
      expect(typeof device.write8).toBe('function');
      expect(typeof device.write16).toBe('function');
      expect(typeof device.readByte).toBe('function');
      expect(typeof device.readBytes).toBe('function');
      expect(typeof device.writeByte).toBe('function');
      expect(typeof device.writeBytes).toBe('function');
    });

    it('should throw OperationError when opening fails', async () => {
      const port = new I2CPort(1);
      const error = new Error('Failed to open');
      (
        vi.mocked(openPromisified) as ReturnType<typeof vi.fn>
      ).mockRejectedValueOnce(error);

      await expect(port.open(0x12)).rejects.toThrow(OperationError);
    });
  });
});
