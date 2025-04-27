import { openPromisified } from 'i2c-bus';
import { OperationError } from '../errors/operation-error';
import {
  I2CSlaveAddress,
  I2CSlaveDevice,
  PortNumber,
} from '../types/i2c-types';
import { parseUint16 } from '../utils/i2c-utils';

/**
 * I2CPort クラス
 */
export class I2CPort {
  private readonly _portNumber: PortNumber;

  /**
   * Creates an instance of I2CPort.
   * @param portNumber ポート番号
   */
  constructor(portNumber: PortNumber) {
    this._portNumber = parseUint16(portNumber.toString());
  }

  /**
   * ポート番号取得処理
   * @return 現在のポート番号
   */
  get portNumber(): PortNumber {
    return this._portNumber;
  }

  /**
   * ポート名取得処理
   * @return 現在のポート名
   */
  get portName(): string {
    return `i2c-${this.portNumber}`;
  }

  /**
   * I2CSlave 接続デバイスオープン処理
   * @param slaveAddress 接続デバイス情報のアドレス
   * @return I2CSlaveDevice インスタンスの生成の完了
   */
  async open(slaveAddress: I2CSlaveAddress): Promise<I2CSlaveDevice> {
    const bus = await openPromisified(this.portNumber).catch((error: Error) => {
      throw new OperationError(error.message);
    });

    return {
      slaveAddress,
      read8: (registerNumber) =>
        bus.readByte(slaveAddress, registerNumber).catch((error: Error) => {
          throw new OperationError(error.message);
        }),
      read16: (registerNumber) =>
        bus.readWord(slaveAddress, registerNumber).catch((error: Error) => {
          throw new OperationError(error.message);
        }),
      write8: async (registerNumber, byte) => {
        try {
          await bus.writeByte(slaveAddress, registerNumber, byte);
          return byte;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
      write16: async (registerNumber, word) => {
        try {
          await bus.writeWord(slaveAddress, registerNumber, word);
          return word;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
      readByte: async () => {
        try {
          const byte = await bus.receiveByte(slaveAddress);
          return byte;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
      readBytes: async (length) => {
        try {
          const { bytesRead, buffer } = await bus.i2cRead(
            slaveAddress,
            length,
            Buffer.allocUnsafe(length),
          );
          return new Uint8Array(buffer.slice(0, bytesRead));
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
      writeByte: async (byte) => {
        try {
          await bus.sendByte(slaveAddress, byte);
          return byte;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
      writeBytes: async (bytes) => {
        try {
          const { bytesWritten, buffer } = await bus.i2cWrite(
            slaveAddress,
            bytes.length,
            Buffer.from(bytes),
          );
          return new Uint8Array(buffer.slice(0, bytesWritten));
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new OperationError(error.message);
          }
          throw new OperationError('Unknown error occurred');
        }
      },
    };
  }
}
