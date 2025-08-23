export const checkPasswordStrength = (value: string) => {
  const passwordChecks = {
    hasNumber: {
      isValid: /\d/.test(value),
      errorMessage: 'Password must contain at least one number',
    },
    hasUpper: {
      isValid: /[A-Z]/.test(value),
      errorMessage: 'Password must contain at least one uppercase letter',
    },
    hasLower: {
      isValid: /[a-z]/.test(value),
      errorMessage: 'Password must contain at least one lowercase letter',
    },
    hasSpecial: {
      isValid: /[@$!%*?&]/.test(value),
      errorMessage: 'Password must contain at least one special character',
    },
  };

  const isAllChecksValid = Object.values(passwordChecks).every(
    (check) => check.isValid
  );

  const errorsArray = Object.values(passwordChecks)
    .filter((check) => !check.isValid)
    .map((check) => '\n' + check.errorMessage);

  return {
    isValid: isAllChecksValid,
    message: 'Password is not strong enough.' + errorsArray.join(', '),
  };
};
