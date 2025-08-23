import type { FormDataState } from '@src/types/FormDataState';

export const getFormOrder = (form: HTMLFormElement) => {
  const names: string[] = [];
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    const name = el?.name;
    if (!name) continue;
    if (!names.includes(name)) names.push(name);
  }
  return names as (keyof FormDataState)[];
};
