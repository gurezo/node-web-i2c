/** ポート番号 */
export type PortNumber = number;
/** ポート名 */
export type PortName = string;
/** I2C Slave アドレス */
export type I2CSlaveAddress = number;
/**
 * I2CSlaveDevice インターフェース
 */
export interface I2CSlaveDevice {
  /** I2C Slave アドレス */
  readonly slaveAddress: I2CSlaveAddress;
  /**
   * I2C 読み取り処理
   * @param registerNumber 読み取りアドレス
   */
  read8(registerNumber: number): Promise<number>;
  /**
   * I2C 読み取り処理
   * @param registerNumber 読み取りアドレス
   */
  read16(registerNumber: number): Promise<number>;
  /**
   * I2C 書き込み処理
   * @param registerNumber 書き込みアドレス
   * @param value 書き込みの値（バイト）
   */
  write8(registerNumber: number, value: number): Promise<number>;
  /**
   * I2C 書き込み処理
   * @param registerNumber 書き込みアドレス
   * @param value 書き込みの値（ワード）
   */
  write16(registerNumber: number, value: number): Promise<number>;
  /**
   * I2C 読み取りバイト処理
   */
  readByte(): Promise<number>;
  /**
   * I2C 読み取りバイト処理
   * @param length 読み取る配列の長さ
   */
  readBytes(length: number): Promise<Uint8Array>;
  /**
   * I2C 書き込みバイト処理
   * @param byte 書き込みの値
   */
  writeByte(byte: number): Promise<number>;
  /**
   * I2C 書き込みバイト配列処理
   * @param bytes 書き込みの値の配列
   */
  writeBytes(bytes: Array<number>): Promise<Uint8Array>;
}
