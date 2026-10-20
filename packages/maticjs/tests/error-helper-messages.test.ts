/**
 * Regression tests for missing ErrorHelper messages.
 *
 * Background
 * ----------
 * `ErrorHelper` derives `message` from a switch over `ERROR_TYPE`. The `default`
 * branch of that switch falls back to `this.message`, but `this.message` is only
 * assigned *from the switch's return value*, so at that point it is still
 * `undefined`. Every type without an explicit `case` was therefore thrown with
 * `message: undefined` — an error object that says nothing:
 *
 *   - `TransactionOptionNotObject` — thrown by `BaseToken.validateTxOption_`,
 *     i.e. every read/write call passed a non-object `option`
 *   - `AllowedOnNonNativeTokens` — thrown by `BaseToken.checkForNonNative`
 *   - `BridgeAdapterNotFound` — thrown by `BaseToken.checkAdapterPresent`
 *   - `Unknown` — the fallback type itself
 *
 * These tests pin a readable message for each of those types, including the
 * call-site detail (`info`) that the guarded callers pass in.
 */
import { describe, expect, it } from 'vitest';

import { ERROR_TYPE } from '../src/enums';
import { ErrorHelper } from '../src/utils/error_helper';

const expectReadableMessage = (error: { message?: unknown; type: ERROR_TYPE }) => {
  expect(error.type).toBeTruthy();
  expect(typeof error.message).toBe('string');
  expect((error.message as string).length).toBeGreaterThan(0);
};

describe('ErrorHelper message coverage', () => {
  it('describes a non-object transaction option', () => {
    const error = new ErrorHelper(ERROR_TYPE.TransactionOptionNotObject).get();

    expectReadableMessage(error);
    expect(error.message).toMatch(/option/i);
  });

  it('names the method that requires a non-native token', () => {
    const error = new ErrorHelper(ERROR_TYPE.AllowedOnNonNativeTokens, 'depositCustomERC20').get();

    expectReadableMessage(error);
    expect(error.message).toContain('depositCustomERC20');
    expect(error.message).toMatch(/token/i);
  });

  it('explains that a bridge adapter address is missing', () => {
    const error = new ErrorHelper(ERROR_TYPE.BridgeAdapterNotFound, 'depositCustomERC20').get();

    expectReadableMessage(error);
    expect(error.message).toContain('depositCustomERC20');
    expect(error.message).toMatch(/bridge adapter/i);
  });

  it('falls back to a readable message for unknown types', () => {
    const error = new ErrorHelper(ERROR_TYPE.Unknown).get();

    expect(error.type).toBe(ERROR_TYPE.Unknown);
    expectReadableMessage(error);
  });
});
