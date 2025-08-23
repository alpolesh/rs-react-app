import { useState, useEffect } from 'react';
import type { FormDataState, OrderedFormData } from '@src/types/FormDataState';
import InfoCardWrapper from '@components/InfoCard/InfoCardWrapper';

type Props = {
  title: string;
  formData: OrderedFormData | null;
};

export default function InfoCard({ title, formData }: Props) {
  const [isBorderHighlighting, setIsBorderHighlighting] = useState(false);

  useEffect(() => {
    if (!formData) return;
    setIsBorderHighlighting(true);
    setTimeout(() => {
      setIsBorderHighlighting(false);
    }, 2000);
  }, [formData]);

  if (!formData)
    return (
      <InfoCardWrapper
        title={title}
        isBorderHighlighting={isBorderHighlighting}
      >
        <p className="text-gray-600">No data</p>
      </InfoCardWrapper>
    );

  const { data, order } = formData;

  const renderField = <K extends keyof FormDataState>(
    key: K,
    value: FormDataState[K]
  ) => {
    if (key === 'picture' && value) {
      return (
        <div className="flex flex-col">
          <strong className="text-gray-800 capitalize">{String(key)}:</strong>
          <img
            src={value as string}
            alt="Uploaded"
            className="mt-1 max-w-[100px] rounded"
          />
        </div>
      );
    }
    return (
      <div className="flex">
        <strong className="text-gray-800 capitalize">{String(key)}:</strong>
        <span className="text-gray-600 ml-1">{String(value ?? '-')}</span>
      </div>
    );
  };

  const keysToShow = order.filter(
    (k) => k !== 'password1' && k !== 'password2'
  );

  return (
    <InfoCardWrapper title={title} isBorderHighlighting={isBorderHighlighting}>
      <ul className="space-y-2">
        {keysToShow.map((key) => (
          <li key={String(key)} className="flex items-start p-2 m-0">
            {renderField(key, data[key])}
          </li>
        ))}
      </ul>
    </InfoCardWrapper>
  );
}
