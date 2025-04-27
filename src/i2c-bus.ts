import { I2CBus as BaseI2CBus } from '@johntalton/and-other-delights';

export interface I2CBusOptions {
  busNumber: number;
}

export interface I2CBus {
  open(): Promise<void>;
  close(): Promise<void>;
  readByte(address: number): Promise<number>;
  writeByte(address: number, byte: number): Promise<void>;
  readBytes(address: number, length: number): Promise<Buffer>;
  writeBytes(address: number, buffer: Buffer): Promise<void>;
}

interface BaseI2CBusOptions {
  busNumber: number;
}

interface BaseI2CBus {
  open(): Promise<void>;
  close(): Promise<void>;
  readByte(address: number): Promise<number>;
  writeByte(address: number, byte: number): Promise<void>;
  readBytes(address: number, length: number): Promise<Buffer>;
  writeBytes(address: number, buffer: Buffer): Promise<void>;
}

export class I2CBusImpl implements I2CBus {
  private busNumber: number;
  private bus: BaseI2CBus | null = null;

  constructor(options: I2CBusOptions) {
    this.busNumber = options.busNumber;
  }

  async open(): Promise<void> {
    // TODO: Implement actual I2C bus opening
    const options: BaseI2CBusOptions = { busNumber: this.busNumber };
    this.bus = new BaseI2CBus(options) as BaseI2CBus;
    await this.bus.open();
  }

  async close(): Promise<void> {
    if (this.bus) {
      await this.bus.close();
      this.bus = null;
    }
  }

  async readByte(address: number): Promise<number> {
    if (!this.bus) {
      throw new Error('I2C bus is not open');
    }
    return await this.bus.readByte(address);
  }

  async writeByte(address: number, byte: number): Promise<void> {
    if (!this.bus) {
      throw new Error('I2C bus is not open');
    }
    await this.bus.writeByte(address, byte);
  }

  async readBytes(address: number, length: number): Promise<Buffer> {
    if (!this.bus) {
      throw new Error('I2C bus is not open');
    }
    return await this.bus.readBytes(address, length);
  }

  async writeBytes(address: number, buffer: Buffer): Promise<void> {
    if (!this.bus) {
      throw new Error('I2C bus is not open');
    }
    await this.bus.writeBytes(address, buffer);
  }
}

export function createI2CBus(options: I2CBusOptions): I2CBus {
  return new I2CBusImpl(options);
}
