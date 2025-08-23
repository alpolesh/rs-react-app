import { checkPasswordStrength } from '@src/helpers/checkPasswordStrength';

describe('checkPasswordStrength', () => {
  it('should fail if password has no number', () => {
    const result = checkPasswordStrength('Abcdef!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain(
      'Password must contain at least one number'
    );
  });

  it('should fail if password has no uppercase letter', () => {
    const result = checkPasswordStrength('abc123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain(
      'Password must contain at least one uppercase letter'
    );
  });

  it('should fail if password has no lowercase letter', () => {
    const result = checkPasswordStrength('ABC123!');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain(
      'Password must contain at least one lowercase letter'
    );
  });

  it('should fail if password has no special character', () => {
    const result = checkPasswordStrength('Abc1234');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain(
      'Password must contain at least one special character'
    );
  });

  it('should fail with multiple missing requirements', () => {
    const result = checkPasswordStrength('abc');
    expect(result.isValid).toBe(false);
    expect(result.message).toContain(
      'Password must contain at least one number'
    );
    expect(result.message).toContain(
      'Password must contain at least one uppercase letter'
    );
    expect(result.message).toContain(
      'Password must contain at least one special character'
    );
  });

  it('should pass if all requirements are met', () => {
    const result = checkPasswordStrength('Abc123!');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('Password is not strong enough.');
  });
});
