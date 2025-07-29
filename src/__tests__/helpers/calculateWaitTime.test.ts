import { calculateWaitTime } from '@src/helpers';
import { vi } from 'vitest';

describe('calculateWaitTime', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns remaining time if spinner time not elapsed', () => {
    const minSpinnerTime = 500;
    const startTime = 1000;
    vi.spyOn(Date, 'now').mockReturnValue(1200);

    const result = calculateWaitTime(minSpinnerTime, startTime);
    expect(result).toBe(300);
  });

  it('returns 0 if spinner time has already elapsed', () => {
    const minSpinnerTime = 500;
    const startTime = 1000;
    vi.spyOn(Date, 'now').mockReturnValue(1600);

    const result = calculateWaitTime(minSpinnerTime, startTime);
    expect(result).toBe(0);
  });
});
