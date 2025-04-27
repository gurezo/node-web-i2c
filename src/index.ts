import { I2CAccess } from './access/i2c-access';
import { OperationError } from './errors/operation-error';
import { I2CPort } from './ports/i2c-port';
import { I2CPortMap } from './ports/i2c-port-map';
import type {
  I2CSlaveAddress,
  I2CSlaveDevice,
  PortName,
  PortNumber,
} from './types/i2c-types';

export { I2CAccess, I2CPort, I2CPortMap, OperationError };
export type { I2CSlaveAddress, I2CSlaveDevice, PortName, PortNumber };

/**
 * I2Cアクセス要求処理
 * @return I2CAccess インスタンス
 */
export function requestI2CAccess(): I2CAccess {
  return new I2CAccess();
}
