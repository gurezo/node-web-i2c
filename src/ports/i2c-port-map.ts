import { PortName, PortNumber } from '../types/i2c-types';
import { parseUint16 } from '../utils/i2c-utils';
import { I2CPort } from './i2c-port';

/**
 * I2Cポートマップクラス
 */
export class I2CPortMap extends Map<PortNumber, I2CPort> {
  /**
   * ポート名からポートを取得
   * @param portName ポート名
   * @return ポートインスタンス
   */
  getByName(portName: PortName): I2CPort | undefined {
    const matches = /^i2c-(\d+)$/.exec(portName);
    return matches == null ? undefined : this.get(parseUint16(matches[1]));
  }
}
