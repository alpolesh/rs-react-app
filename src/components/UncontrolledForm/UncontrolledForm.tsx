import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/store/index';
import { createSchema } from '@src/validation/userFormScheme';
import { useDispatch } from 'react-redux';
import { saveUncontrolledFormData } from '@src/store/slices/formsDataSlice';
import { fileToBase64 } from '@src/helpers/fileToBase64';
import { getFormOrder } from '@src/helpers/getFormOrder';
import * as yup from 'yup';

type Props = {
  hide: () => void;
};

const UncontrolledForm = ({ hide }: Props) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = useSelector((state: RootState) => state.countries);
  const schema = createSchema(countries);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const pictureFile = formData.get('picture');
    const data = {
      name: formData.get('name') as string,
      age: formData.get('age') ? Number(formData.get('age')) : undefined,
      email: formData.get('email') as string,
      password1: formData.get('password1') as string,
      password2: formData.get('password2') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      picture:
        pictureFile instanceof File && pictureFile.size > 0
          ? pictureFile
          : undefined,
      country: formData.get('country') as string,
    };

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      let pictureBase64: string | undefined;
      if (data.picture) {
        pictureBase64 = await fileToBase64(data.picture);
      }
      const finalData = { ...data, picture: pictureBase64 };

      const order = getFormOrder(form);
      dispatch(saveUncontrolledFormData({ data: finalData, order }));

      hide();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl text-center bold">Uncontrolled form</h3>
      <div className="mb-1">
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.name || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="age" className="block font-medium">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.age || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.email || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="password1" className="block font-medium">
          Password
        </label>
        <input
          id="password1"
          name="password1"
          type="password"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.password1 || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="password2" className="block font-medium">
          Confirm Password
        </label>
        <input
          id="password2"
          name="password2"
          type="password"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.password2 || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label className="block font-medium">Gender</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input type="radio" name="gender" value="male" /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
        </div>
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.gender || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="terms" /> I accept Terms & Conditions
        </label>
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.terms || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="picture" className="block font-medium">
          Upload Picture
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png,image/jpeg"
          className="mt-1"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.picture || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="country" className="block font-medium">
          Country
        </label>
        <input
          id="country"
          name="country"
          list="countries"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.country || '\u00A0'}
        </p>
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
