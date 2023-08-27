import { describe, expect, test } from 'vitest';

import { TEST } from '@/teste';

describe('test', () => {
  test('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  test('should test with path alias', () => {
    expect(TEST.isGood).toBe(true);
  });
});
