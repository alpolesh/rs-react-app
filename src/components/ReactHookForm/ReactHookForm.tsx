import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RootState } from '@src/store/index';
import { saveReactHookFormData } from '@src/store/slices/formsDataSlice';
import type { FormDataState } from '@src/types/FormDataState';
import { fileToBase64 } from '@src/helpers/fileToBase64';
import { createSchema } from '@src/validation/userFormScheme';
import { getFormOrder } from '@src/helpers/getFormOrder';

type Props = {
  hide: () => void;
};

type ReactHookFormData = Omit<FormDataState, 'picture'> & {
  picture?: File;
};

const ReactHookForm = ({ hide }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

  const schema = createSchema(countries);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReactHookFormData>({
    resolver: yupResolver(schema) as Resolver<ReactHookFormData>,
    mode: 'onChange',
  });

  const onSubmit = async (data: ReactHookFormData) => {
    let pictureBase64: string | undefined;
    if (data.picture instanceof File) {
      pictureBase64 = await fileToBase64(data.picture);
    }
    const finalData = { ...data, picture: pictureBase64 };

    const order = formRef.current ? getFormOrder(formRef.current) : [];
    dispatch(saveReactHookFormData({ data: finalData, order }));
    hide();
  };

  const password1Value = watch('password1');

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-2xl text-center bold">React Hook Form</h3>

      <div className="mb-1">
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.name?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="age" className="block font-medium">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register('age')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.age?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.email?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="password1" className="block font-medium">
          Password
        </label>
        <input
          id="password1"
          type="password"
          {...register('password1')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-13 overflow-auto whitespace-pre-line">
          {errors.password1
            ? errors.password1?.message || '\u00A0'
            : password1Value && (
                <span className="text-green-600 ">Password is strong</span>
              )}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="password2" className="block font-medium">
          Confirm Password
        </label>
        <input
          id="password2"
          type="password"
          {...register('password2')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.password2?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label className="block font-medium">Gender</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input type="radio" value="male" {...register('gender')} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> Female
          </label>
        </div>
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.gender?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('terms')} /> I accept Terms &
          Conditions
        </label>
        <p className="text-red-600 mt-1 h-6">
          {errors.terms?.message || '\u00A0'}
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            setValue('picture', file, { shouldValidate: true });
          }}
        />
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.picture?.message || '\u00A0'}
        </p>
      </div>

      <div className="mb-1">
        <label htmlFor="country" className="block font-medium">
          Country
        </label>
        <input
          id="country"
          list="countries"
          {...register('country')}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <p className="text-red-600 mt-1 h-6 overflow-auto">
          {errors.country?.message || '\u00A0'}
        </p>
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
