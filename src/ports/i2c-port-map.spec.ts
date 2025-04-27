// @vitest-environment jsdom
import { describe, expect, it, vi, type TestContext } from 'vitest';
import { I2CPort } from './i2c-port';
import { I2CPortMap } from './i2c-port-map';

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

describe<TestContext>('I2CPortMap', () => {
  it<TestContext>('should get port by name', () => {
    const portMap = new I2CPortMap();
    const port = new I2CPort(1);
    portMap.set(1, port);

    expect(portMap.getByName('i2c-1')).toBe(port);
    expect(portMap.getByName('i2c-2')).toBeUndefined();
    expect(portMap.getByName('invalid')).toBeUndefined();
  });
});
