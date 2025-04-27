import { describe, expect, it } from 'vitest';
import { OperationError } from './operation-error';

describe('OperationError', () => {
  it('should create an instance with message', () => {
    const message = 'Test error message';
    const error = new OperationError(message);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('OperationError');
    expect(error.message).toBe(message);
  });
});
