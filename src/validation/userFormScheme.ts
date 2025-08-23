import * as yup from 'yup';
import { checkPasswordStrength } from '@src/helpers/checkPasswordStrength';

export const createSchema = (countries: string[]) =>
  yup.object({
    name: yup
      .string()
      .required('Name is required')
      .test(
        'first-letter-uppercase',
        'First letter must be uppercase',
        (value) => !value || /^[A-Z]/.test(value)
      ),
    age: yup
      .number()
      .required('Age is required')
      .typeError('Age must be a number')
      .min(0, 'Age cannot be negative'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password1: yup
      .string()
      .required('Password is required')
      .test('password-strength', function (value) {
        if (!value) return true;
        const { isValid, message } = checkPasswordStrength(value);
        return isValid || this.createError({ message });
      }),
    password2: yup
      .string()
      .oneOf([yup.ref('password1')], 'Passwords must match')
      .required('Please confirm password'),
    gender: yup.string().required('Select gender'),
    terms: yup.boolean().oneOf([true], 'Accept T&C'),
    picture: yup
      .mixed<File>()
      .notRequired()
      .test(
        'fileSize',
        'File too large',
        (value) => !value || value.size <= 2_000_000
      )
      .test(
        'fileType',
        'Unsupported format',
        (value) =>
          !value ||
          !value.name ||
          ['image/png', 'image/jpeg'].includes(value.type)
      ),
    country: yup
      .string()
      .oneOf(countries, 'Select a valid country')
      .required('Country is required'),
  });
