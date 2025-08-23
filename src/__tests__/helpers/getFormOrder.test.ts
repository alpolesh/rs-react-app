import { getFormOrder } from '@src/helpers/getFormOrder';

describe('getFormOrder', () => {
  it('returns the names of inputs in the order they appear in the form', () => {
    const form = document.createElement('form');

    const input1 = document.createElement('input');
    input1.name = 'name';
    form.appendChild(input1);

    const input2 = document.createElement('input');
    input2.name = 'email';
    form.appendChild(input2);

    const input3 = document.createElement('input');
    input3.name = 'age';
    form.appendChild(input3);

    const order = getFormOrder(form);

    expect(order).toEqual(['name', 'email', 'age']);
  });

  it('ignores inputs without a name and duplicates', () => {
    const form = document.createElement('form');

    const input1 = document.createElement('input');
    input1.name = 'name';
    form.appendChild(input1);

    const input2 = document.createElement('input');
    form.appendChild(input2);

    const input3 = document.createElement('input');
    input3.name = 'name';
    form.appendChild(input3);

    const input4 = document.createElement('input');
    input4.name = 'email';
    form.appendChild(input4);

    const order = getFormOrder(form);

    expect(order).toEqual(['name', 'email']);
  });
});
