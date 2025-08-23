export type FormDataState = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  terms: boolean;
  picture?: string;
  country: string;
};

export type OrderedFormData = {
  data: FormDataState;
  order: (keyof FormDataState)[];
};

export type FormsData = {
  uncontrolledFormData: OrderedFormData | null;
  reactHookFormData: OrderedFormData | null;
};
